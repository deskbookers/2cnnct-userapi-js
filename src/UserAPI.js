/**
 * UserAPI 2cnnct
 * 
 * @param string publicKey
 * @param string privateKey
 * @param string apiHost
 * @param int resellerID
 * @param int apiVersion
 * @param string locale
 */
function UserAPI_2cnnct(publicKey, privateKey, apiHost, resellerID, apiVersion, locale)
{
	// API version
	if ( ! apiVersion)
	{
		apiVersion = 1;
	}

	function buildCheckData(method, timestamp, uri, post)
	{
		// Prepare post
		if ( ! post || typeof post != 'object' || Object.keys(post).length == 0)
		{
			post = [];
		}

		// Build data
		return method + "\n" + timestamp + "\n" + uri + "\n" + JSON.stringify(post);
	}

	function buildCheckHash(method, timestamp, uri, post)
	{
		return CryptoJS.HmacSHA512(buildCheckData(method, timestamp, uri, post), privateKey);
	}

	function buildUri(uri, uriParams)
	{
		if (uriParams && typeof uriParams == 'object')
		{
			for (var key in uriParams)
			{
				if (('' + uriParams[key]).length == 0)
					throw new Error('Invalid uri param \'' + key + '\' given, can not be empty');
				uri = uri.split('<' + key + '>').join(uriParams[key]);
			}
		}
		return uri;
	}

	var requests = [];

	function logRequest(req)
	{
		return;
		//THIS FUNCTION IS NOT WORKING ATM: THIS IS ONLY DOABLE WITH JQUERY
		requests.push(req);
		req.always(function()
		{
			unlogRequest(req);
		});
	}

	function unlogRequest(req)
	{
		return;
		//THIS FUNCTION IS NOT WORKING ATM: THIS IS ONLY DOABLE WITH JQUERY
		var pos = requests.indexOf(req);
		if (pos != -1)
		{
			requests.splice(pos, 1);
		}
	}

	/**
	 * Get reseller ID
	 *
	 * @return int
	 */
	this.getResellerID = function()
	{
		return resellerID;
	}

	/**
	 * Abort all requests
	 */
	this.abortAll = function()
	{
		return;
		//THIS FUNCTION IS NOT WORKING ATM: THIS IS ONLY DOABLE WITH JQUERY
		for (var i = 0; i < requests.length; ++i)
		{
			requests[i].aborted = true;
			requests[i].abort();
		}
		requests = [];
	};

	/**
	 * Post or error
	 *
	 * Does not throw exceptions on errors but pass these to the callback function
	 * 
	 * @param function cb Callback function(error, result)
	 * @param object data
	 * @param string uri
	 * @param object uriParams
	 */
	this.postOrError = function(cb, data, uri, uriParams)
	{
		try
		{
			this.post(cb, data, uri, uriParams, true);
		}
		catch (e)
		{
			cb(e, null);
		}
	};

	/**
	 * Post
	 *
	 * Throws exceptions on errors.
	 * 
	 * @param function cb Callback function(result)
	 * @param object data
	 * @param string uri
	 * @param object uriParams
	 * @param bool catch_
	 */
	this.post = function(cb, data, uri, uriParams, catch_)
	{
		// Prepare/check arguments
		if ( typeof cb !== 'function' )
		{
			throw new Error('Invalid callback function provided');
		}
		if ( ! data || typeof data != 'object')
		{
			data = {};
		}
		if ( ! uriParams || typeof uriParams != 'object')
		{
			uriParams = {};
		}

		// Prepare data
		for (var key in data)
		{
			data[key] = JSON.stringify(data[key]);
		}
		data.__i18n = JSON.stringify(locale);
		data.__format = JSON.stringify('json');
		data.__resellerID = JSON.stringify(resellerID);

		// URI
		uri = '/userapi/v' + apiVersion + '/' + buildUri(uri, uriParams);

		// Body
		var query = http_build_query(data);
		var timestamp = Math.round(new Date().getTime() / 1000);
		// Ajax
		logRequest(
			axios({
					url: 'https://' + apiHost + uri,
					data: query,
					method: 'post',
					//cache: false,
					responseType: 'json',
					// withCredentials: false,
					headers: {
						'Timestamp': timestamp,
						'Authenticate': publicKey + ':' + buildCheckHash('POST', timestamp, uri, data)
					}
				})
				.then(function (response) {
					var error = getAPIError(response);
					if (catch_) {
						cb(error, response.data.result);
					} else if(error) {
						throw error;
					} else {
						cb(response.data.result);
					}
  				})
  				.catch(function (response) {
  					var error = getAPIError(response);
  					if (catch_) {
  						cb(error, null);
  					} else if(error) {
  						throw error;
  					}
  				})
		);
	};

	/**
	 * Get or error
	 *
	 * Does not throw exceptions on errors but pass these to the callback function
	 * 
	 * @param function cb Callback function(error, result)
	 * @param array fields
	 * @param string uri
	 * @param object uriParams
	 * @param object data
	 */
	this.getOrError = function(cb, fields, uri, uriParams, data)
	{
		try
		{
			this.get(cb, fields, uri, uriParams, data, true);
		}
		catch (e)
		{
			cb(e, null);
		}
	};

	/**
	 * Get
	 *
	 * Throws excepions on errors
	 * 
	 * @param function cb Callback function(result)
	 * @param array fields
	 * @param string uri
	 * @param object uriParams
	 * @param object data
	 * @param bool catch_
	 */
	this.get = function(cb, fields, uri, uriParams, data, catch_)
	{
		// Prepare/check arguments
		if ( typeof cb !== 'function')
		{
			throw new Error('Invalid callback function provided');
		}
		if ( Object.prototype.toString.call( fields ) !== '[object Array]' )
		{
			throw new Error('Invalid fields array provided (not an array)');
		}
		if ( ! data || typeof data != 'object')
		{
			data = {};
		}
		if ( ! uriParams || typeof uriParams != 'object')
		{
			uriParams = {};
		}

		// Prepare data
		for (var key in data)
		{
			data[key] = JSON.stringify(data[key]);
		}
		data.__fields = JSON.stringify(fields);
		data.__i18n = JSON.stringify(locale);
		data.__format = JSON.stringify('json');
		data.__resellerID = JSON.stringify(resellerID);

		// URI
		uri = '/userapi/v' + apiVersion + '/' + buildUri(uri, uriParams);
		var query = http_build_query(data);
		if (query.length > 0) uri += '?' + query;


		var timestamp = Math.round(new Date().getTime() / 1000);
		// Ajax
		logRequest(
			axios({
					url: 'https://' + apiHost + uri,
					//cache: false,
					responseType: 'json',
					// withCredentials: false,
					headers: {
						'Timestamp': timestamp,
						'Authenticate': publicKey + ':' + buildCheckHash('GET', timestamp, uri, {})
					}
				})
				.then(function (response) {
					var error = getAPIError(response);
					if (catch_) {
						cb(error, response.data.result);
					} else if(error) {
						throw error;
					} else {
						cb(response.data.result);
					}
  				})
  				.catch(function (response) {
  					var error = getAPIError(response);
  					if (catch_) {
  						cb(error, null);
  					} else if(error) {
  						throw error;
  					}
  				})
		);
	};
}

/**
 * Factory
 *
 * @param string publicKey
 * @param string privateKey
 * @param string apiHost
 * @param int resellerID
 * @param int apiVersion
 * @param string locale
 * @return UserAPI_2cnnct
 */
UserAPI_2cnnct.factory = function(publicKey, privateKey, apiHost, resellerID, apiVersion, locale)
{
	return new UserAPI_2cnnct(
		publicKey,
		privateKey,
		apiHost,
		resellerID,
		apiVersion,
		locale
	);
};

/**
 * Login for reseller collection
 *
 * @param function cb Callback function(bool error, publicKey, privateKey, api)
 * @param string email
 * @param string password
 * @param string apiHost
 * @param int resellerID
 * @param int apiVersion
 * @param string locale
 * @param function cb2 Callback function(resellers, function cb(resellerID))
 */
UserAPI_2cnnct.loginResellerCollection = function(cb, email, password, apiHost, resellerCollectionID, apiVersion, locale, cb2)
{
	// API version
	if ( ! apiVersion)
	{
		apiVersion = 1;
	}

	var timestamp = Math.round(new Date().getTime() / 1000);
	axios({
			url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/loginResellerCollection?' + http_build_query({
				email: JSON.stringify(email),
				resellerCollectionID: JSON.stringify(resellerCollectionID)
			}),
			//cache: false,
			responseType: 'json',
			// withCredentials: false,
			headers: {
				'Timestamp': timestamp,
				'Authenticate': publicKey + ':' + buildCheckHash('GET', timestamp, uri, {})
			}
		})
		.then(function (response) {
			if (!response.data.result) {
				cb(response.data.errorMessage || 'Invalid login credentials');
				return;
			}

			var resellers = response.data.result;
			if (resellers.length == 0) {
				cb('User is not part of the reseller collection');
				return;
			}
			
			if (resellers.length == 1) {
				UserAPI_2cnnct.login(cb, email, password, apiHost, resellers[0].id, apiVersion, locale);
				return;
			}
			
			cb2(resellers, function(resellerID)
			{
				UserAPI_2cnnct.login(cb, email, password, apiHost, resellerID, apiVersion, locale);
			});
			return;
		})
		.catch(function (response) {
			var error = getAPIError(response);
			if (error) {
				cb(error);
			} else {
				cb('Connection error');
			}
		});
}

/**
 * Login
 *
 * @param function cb Callback function(bool error, publicKey, privateKey, api, user)
 * @param string email
 * @param string password
 * @param string apiHost
 * @param int resellerID
 * @param int apiVersion
 * @param string locale
 */
UserAPI_2cnnct.login = function(cb, email, password, apiHost, resellerID, apiVersion, locale)
{
	// API version
	if ( ! apiVersion)
	{
		apiVersion = 1;
	}

	axios({
			url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/prepareLogin?' + http_build_query({
				email: JSON.stringify(email),
				__resellerID: JSON.stringify(resellerID)
			}),
			//cache: false,
			responseType: 'json'
		})
		.then(function (response) {
			if (!response.data.result) {
				cb(response.data.errorMessage || 'Invalid login credentials');
				return;
			}

			var settings = response.data.result;
			function hashPassword(cb, password)
			{
				var bcrypt = new bCrypt();
				bcrypt.hashpw(
					password,
					settings,
					function(hash)
					{
						cb(hash);
					},
					function()
					{}
				);
			}

			// Password hash
			hashPassword(function(password)
			{
				axios({
						url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/login?' + http_build_query({
							email: JSON.stringify(email),
							password: JSON.stringify(password),
							__resellerID: JSON.stringify(resellerID)
						}),
						//cache: false,
						responseType: 'json'
						// withCredentials: false,
					})
					.then(function (response) {
						if ( !response.data.result || !response.data.result.publicKey || ! response.data.result.privateKey || ! response.data.result.user)
						{
							cb(response.data.errorMessage || 'Not a valid login'); // Error
						}
						else
						{
							cb(
								false,
								response.data.result.publicKey,
								response.data.result.privateKey,
								UserAPI_2cnnct.factory(
									response.data.result.publicKey,
									response.data.result.privateKey,
									apiHost,
									resellerID,
									apiVersion,
									locale
								),
								response.data.result.user
							);
						}
	  				})
	  				.catch(function (response) {
	  					var error = getAPIError(response);
	  					if (error) {
	  						cb(error);
	  					} else {
	  						cb('Connection error');
	  					}
	  				});
			}, password);
		})
		.catch(function (response) {
			var error = getAPIError(response);
			if (error) {
				cb(error);
			} else {
				cb('Connection error');
			}
		});
};

/**
 * Forgot password
 *
 * @param function cb Callback function(bool error, bool result)
 * @param string email
 * @param string apiHost
 * @param int resellerID
 * @param int apiVersion
 * @param string locale
 */
UserAPI_2cnnct.forgotPassword = function(cb, email, apiHost, resellerID, apiVersion, locale)
{
	// API version
	if ( ! apiVersion)
	{
		apiVersion = 1;
	}

	function hashPassword(cb, password)
	{
		var bcrypt = new bCrypt();
		bcrypt.hashpw(
			password,
			settings,
			function(hash)
			{
				cb(hash);
			},
			function()
			{}
		);
	}

	axios({
			url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/forgot-password?' + http_build_query({
				email: JSON.stringify(email),
				__resellerID: JSON.stringify(resellerID)
			}),
			responseType: 'json'
		})
		.then(function (response) {
			if (!response.data.result){
				cb(response.data.errorMessage || 'Invalid forgot password request');
			} else {
				cb(false, response.data.result);
			}
		})
		.catch(function (response) {
			var error = getAPIError(response);
			if (error) {
				cb(error);
			} else {
				cb('Connection error');
			}
		});
};

/**
 * Register
 *
 * @param function cb Callback function(bool error, publicKey, privateKey, api, user)
 * @param string email
 * @param string password
 * @param string apiHost
 * @param int resellerID
 * @param int apiVersion
 * @param string locale
 */
UserAPI_2cnnct.register = function(cb, email, password, firstName, lastName, apiHost, resellerID, apiVersion, locale)
{
	// API version
	if ( ! apiVersion)
	{
		apiVersion = 1;
	}

	axios({
			url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/prepareRegister?' + http_build_query({
				__resellerID: JSON.stringify(resellerID)
			}),
			//cache: false,
			responseType: 'json'
		})
		.then(function (response) {
			if (!response.data.result) {
				cb(response.data.errorMessage || 'Could not prepare register request');
				return;
			}
			var settings = response.data.result;

			function hashPassword(cb, password)
			{
				var bcrypt = new bCrypt();
				bcrypt.hashpw(
					password,
					settings,
					function(hash)
					{
						cb(hash);
					},
					function()
					{}
				);
			}

			// Password hash
			hashPassword(function(password)
			{
				axios({
						url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/register?' + http_build_query({
							firstName: JSON.stringify(firstName),
							lastName: JSON.stringify(lastName),
							email: JSON.stringify(email),
							password: JSON.stringify(password),
							__resellerID: JSON.stringify(resellerID)
						}),
						//cache: false,
						responseType: 'json'
					})
					.then(function (response) {
						if ( ! response.data.result || ! response.data.result.publicKey || ! response.data.result.privateKey || ! response.data.result.user)
						{
							if (response.data.result && response.data.result.errors)
							{
								cb(response.data.result.errors);
							}
							else
							{
								cb(response.data.errorMessage || 'Not a valid register'); // Error
							}
						}
						else
						{
							cb(
								false,
								response.data.result.publicKey,
								response.data.result.privateKey,
								UserAPI_2cnnct.factory(
									response.data.result.publicKey,
									response.data.result.privateKey,
									apiHost,
									resellerID,
									apiVersion,
									locale
								),
								response.data.result.user
							);
						}
	  				})
	  				.catch(function (response) {
	  					var error = getAPIError(response);
	  					if (error) {
	  						cb(error);
	  					} else {
	  						cb('Connection error');
	  					}
	  				});
	  		}, password);
		})
		.catch(function (response) {
			var error = getAPIError(response);
			if (error) {
				cb(error);
			} else {
				cb('Connection error');
			}
		});
};

function getAPIError(response){
	var data;
	try {
		data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
	} catch(e) {
		//api response is not a JSON
		return new Error('500: Invalid API response (format)');
	}
	

	//error found in the successful response ('soft' error)
	if (data.error) {
		return new Error(
			(data.errorCode ? data.errorCode : 500) + ': '
			+ (data.errorMessage ? data.errorMessage : 'Error')
		);
	}

	//wrong format of the api response
	if (data.result === undefined || response.status > 399) {
		return new Error('500: Invalid API response (format)');
	}

	return null;
}