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
			success: function(result)
			{
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
				try
				{
					var result = JSON.parse(obj.responseText);
					if (obj.error)
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
		});
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
			success: function(result)
			{
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
				try
				{
					var result = JSON.parse(obj.responseText);
					if (obj.error)
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
		});
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
 * Login
 *
 * @param function cb Callback function(bool error, publicKey, privateKey, api)
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
				cb(true);
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
							cb(true); // Error
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
					error: function()
					{
						cb(true); // Error
					}
				});
			}, password);
		},
		error: function()
		{
			cb(true);
		}
	});
};
