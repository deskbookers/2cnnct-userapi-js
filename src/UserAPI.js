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
		requests.push(req);
		req.always(function()
		{
			unlogRequest(req);
		});
	}

	function unlogRequest(req)
	{
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
		if ( ! jQuery.isFunction(cb))
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

		// Ajax
		logRequest(
			$.ajax({
				url: 'https://' + apiHost + uri,
				data: query,
				type: 'POST',
				cache: false,
				dataType: 'json',
				crossDomain: true,
				beforeSend: function(x)
				{
					// Timestamp
					var timestamp = Math.round(new Date().getTime() / 1000);

					// Headers
					x.setRequestHeader('Timestamp', timestamp);
					x.setRequestHeader('Authenticate', publicKey + ':' + buildCheckHash('POST', timestamp, uri, data));
				},
				success: function(result, _, obj)
				{
					if (obj.aborted)
						return;
					try
					{
						if (result.error)
						{
							throw new Error(
								(result.errorCode ? result.errorCode : 500) + ': '
								+ (result.errorMessage ? result.errorMessage : 'Error')
							);
						}
						else if (result.result === undefined)
						{
							throw new Error('500: Invalid API response (format)');
						}
					}
					catch (e)
					{
						if (catch_)
						{
							cb(e, null);
						}
						else
						{
							throw e;
						}
					}
					if (catch_)
					{
						cb(null, result.result);
					}
					else
					{
						cb(result.result);
					}
				},
				error: function(obj)
				{
					if (obj.aborted)
						return;
					try
					{
						var result = JSON.parse(obj.responseText);
						if (result.error)
						{
							throw new Error(
								(result.errorCode ? result.errorCode : 500) + ': '
								+ (result.errorMessage ? result.errorMessage : 'Error')
							);
						}
						else
						{
							throw new SyntaxError('500: Invalid API response (format)');
						}
					}
					catch (e)
					{
						if (catch_)
						{
							cb(e, null);
						}
						else
						{
							throw e;
						}
					}
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
		if ( ! jQuery.isFunction(cb))
		{
			throw new Error('Invalid callback function provided');
		}
		if ( ! jQuery.isArray(fields))
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

		// Ajax
		logRequest(
			$.ajax({
				url: 'https://' + apiHost + uri,
				type: 'GET',
				cache: false,
				dataType: 'json',
				crossDomain: true,
				beforeSend: function(x)
				{
					// Timestamp
					var timestamp = Math.round(new Date().getTime() / 1000);

					// Headers
					x.setRequestHeader('Timestamp', timestamp);
					x.setRequestHeader('Authenticate', publicKey + ':' + buildCheckHash('GET', timestamp, uri, {}));
				},
				success: function(result, _, obj)
				{
					if (obj.aborted)
						return;

					try
					{
						if (result.error)
						{
							throw new Error(
								(result.errorCode ? result.errorCode : 500) + ': '
								+ (result.errorMessage ? result.errorMessage : 'Error')
							);
						}
						else if (result.result === undefined)
						{
							throw new Error('500: Invalid API response (format)');
						}
					}
					catch (e)
					{
						if (catch_)
						{
							cb(e, null);
						}
						else
						{
							throw e;
						}
					}
					if (catch_)
					{
						cb(null, result.result);
					}
					else
					{
						cb(result.result);
					}
				},
				error: function(obj)
				{
					if (obj.aborted)
						return;
					try
					{
						var result = JSON.parse(obj.responseText);
						if (result.error)
						{
							throw new Error(
								(result.errorCode ? result.errorCode : 500) + ': '
								+ (result.errorMessage ? result.errorMessage : 'Error')
							);
						}
						else
						{
							throw new SyntaxError('500: Invalid API response (format)');
						}
					}
					catch (e)
					{

						if (catch_)
						{
							cb(e, null);
						}
						else
						{
							throw e;
						}
					}
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

	// Ajax
	$.ajax({
		url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/loginResellerCollection?' + http_build_query({
			email: JSON.stringify(email),
			resellerCollectionID: JSON.stringify(resellerCollectionID)
		}),
		cache: false,
		type: 'GET',
		dataType: 'json',
		crossDomain: true,
		success: function(result)
		{
			if ( ! result.result)
			{
				cb(result.errorMessage || 'Invalid login credentials');
				return;
			}
			var resellers = result.result;

			if (resellers.length == 0)
			{
				cb('User is not part of the reseller collection');
				return;
			}
			else if (resellers.length == 1)
			{
				UserAPI_2cnnct.login(cb, email, password, apiHost, resellers[0].id, apiVersion, locale);
				return;
			}
			else
			{
				cb2(resellers, function(resellerID)
				{
					UserAPI_2cnnct.login(cb, email, password, apiHost, resellerID, apiVersion, locale);
				});
				return;
			}
		},
		error: function(obj, text)
		{
			if (obj.status === 0 || obj.readyState === 0)
			{
				cb('Connection error');
				return;
			}
			try
			{
				var result = JSON.parse(obj.responseText);
				if (result.error)
				{
					throw new Error(
						(result.errorCode ? result.errorCode : 500) + ': '
						+ (result.errorMessage ? result.errorMessage : 'Error')
					);
				}
				else
				{
					throw new SyntaxError('500: Invalid API response (format)');
				}
			}
			catch (e)
			{
				cb(e);
				return;
			}
			cb(text || 'Connection error');
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

	// Ajax
	$.ajax({
		url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/prepareLogin?' + http_build_query({
			email: JSON.stringify(email),
			__resellerID: JSON.stringify(resellerID)
		}),
		cache: false,
		type: 'GET',
		dataType: 'json',
		crossDomain: true,
		success: function(result)
		{
			if ( ! result.result)
			{
				cb(result.errorMessage || 'Invalid login credentials');
				return;
			}
			var settings = result.result;

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
				// Ajax
				$.ajax({
					url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/login?' + http_build_query({
						email: JSON.stringify(email),
						password: JSON.stringify(password),
						__resellerID: JSON.stringify(resellerID)
					}),
					cache: false,
					type: 'GET',
					dataType: 'json',
					crossDomain: true,
					success: function(result)
					{
						if ( ! result.result || ! result.result.publicKey || ! result.result.privateKey || ! result.result.user)
						{
							cb(result.errorMessage || 'Not a valid login'); // Error
						}
						else
						{
							cb(
								false,
								result.result.publicKey,
								result.result.privateKey,
								UserAPI_2cnnct.factory(
									result.result.publicKey,
									result.result.privateKey,
									apiHost,
									resellerID,
									apiVersion,
									locale
								),
								result.result.user
							);
						}
					},
					error: function(obj, text)
					{
						if (obj.status === 0 || obj.readyState === 0)
						{
							cb('Connection error');
							return;
						}
						try
						{
							var result = JSON.parse(obj.responseText);
							if (result.error)
							{
								throw new Error(
									(result.errorCode ? result.errorCode : 500) + ': '
									+ (result.errorMessage ? result.errorMessage : 'Error')
								);
							}
							else
							{
								throw new SyntaxError('500: Invalid API response (format)');
							}
						}
						catch (e)
						{
							cb(e);
							return;
						}
						cb(text || 'Connection error');
					}
				});
			}, password);
		},
		error: function(obj, text)
		{
			if (obj.status === 0 || obj.readyState === 0)
			{
				cb('Connection error');
				return;
			}
			try
			{
				var result = JSON.parse(obj.responseText);
				if (result.error)
				{
					throw new Error(
						(result.errorCode ? result.errorCode : 500) + ': '
						+ (result.errorMessage ? result.errorMessage : 'Error')
					);
				}
				else
				{
					throw new SyntaxError('500: Invalid API response (format)');
				}
			}
			catch (e)
			{
				cb(e);
				return;
			}
			cb(text || 'Connection error');
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

	// Ajax
	$.ajax({
		url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/forgot-password?' + http_build_query({
			email: JSON.stringify(email),
			__resellerID: JSON.stringify(resellerID)
		}),
		cache: false,
		type: 'GET',
		dataType: 'json',
		crossDomain: true,
		success: function(result)
		{
			if ( ! result.result)
			{
				cb(result.errorMessage || 'Invalid forgot password request');
				return;
			}
			else
			{
				cb(false, result.result);
			}
		},
		error: function(obj, text)
		{
			if (obj.status === 0 || obj.readyState === 0)
			{
				cb('Connection error');
				return;
			}
			try
			{
				var result = JSON.parse(obj.responseText);
				if (result.error)
				{
					throw new Error(
						(result.errorCode ? result.errorCode : 500) + ': '
						+ (result.errorMessage ? result.errorMessage : 'Error')
					);
				}
				else
				{
					throw new SyntaxError('500: Invalid API response (format)');
				}
			}
			catch (e)
			{
				cb(e);
				return;
			}
			cb(text || 'Connection error');
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

	// Ajax
	$.ajax({
		url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/prepareRegister?' + http_build_query({
			__resellerID: JSON.stringify(resellerID)
		}),
		cache: false,
		type: 'GET',
		dataType: 'json',
		crossDomain: true,
		success: function(result)
		{
			if ( ! result.result)
			{
				cb(result.errorMessage || 'Could not prepare register request');
				return;
			}
			var settings = result.result;

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
				// Ajax
				$.ajax({
					url: 'https://' + apiHost + '/userapi/v' + apiVersion + '/register?' + http_build_query({
						firstName: JSON.stringify(firstName),
						lastName: JSON.stringify(lastName),
						email: JSON.stringify(email),
						password: JSON.stringify(password),
						__resellerID: JSON.stringify(resellerID)
					}),
					cache: false,
					type: 'GET',
					dataType: 'json',
					crossDomain: true,
					success: function(result)
					{
						if ( ! result.result || ! result.result.publicKey || ! result.result.privateKey || ! result.result.user)
						{
							if (result.result && result.result.errors)
							{
								cb(result.result.errors);
							}
							else
							{
								cb(result.errorMessage || 'Not a valid register'); // Error
							}
						}
						else
						{
							cb(
								false,
								result.result.publicKey,
								result.result.privateKey,
								UserAPI_2cnnct.factory(
									result.result.publicKey,
									result.result.privateKey,
									apiHost,
									resellerID,
									apiVersion,
									locale
								),
								result.result.user
							);
						}
					},
					error: function(obj, text)
					{
						if (obj.status === 0 || obj.readyState === 0)
						{
							cb('Connection error');
							return;
						}
						try
						{
							var result = JSON.parse(obj.responseText);
							if (result.error)
							{
								throw new Error(
									(result.errorCode ? result.errorCode : 500) + ': '
									+ (result.errorMessage ? result.errorMessage : 'Error')
								);
							}
							else
							{
								throw new SyntaxError('500: Invalid API response (format)');
							}
						}
						catch (e)
						{
							cb(e);
							return;
						}
						cb(text || 'Connection error');
					}
				});
			}, password);
		},
		error: function(obj, text)
		{
			if (obj.status === 0 || obj.readyState === 0)
			{
				cb('Connection error');
				return;
			}
			try
			{
				var result = JSON.parse(obj.responseText);
				if (result.errors)
				{
					throw new Error(
						(result.errorCode ? result.errorCode : 500) + ': '
						+ (result.errorMessage ? result.errorMessage : 'Error')
					);
				}
				else
				{
					throw new SyntaxError('500: Invalid API response (format)');
				}
			}
			catch (e)
			{
				cb(e);
				return;
			}
			cb(text || 'Connection error');
		}
	});
};
