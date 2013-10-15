/**
 * URL encode
 */
function urlencode(e){e=(e+"").toString();return encodeURIComponent(e).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")};

/**
 * HTTP build query
 */
function http_build_query(e,t,n){var r,i,s=[],o=this;var u=function(e,t,n){var r,i=[];if(t===true){t="1"}else if(t===false){t="0"}if(t!=null){if(typeof t==="object"){for(r in t){if(t[r]!=null){i.push(u(e+"["+r+"]",t[r],n))}}return i.join(n)}else if(typeof t!=="function"){return o.urlencode(e)+"="+o.urlencode(t)}else{throw new Error("There was an error processing for http_build_query().")}}else{return""}};if(!n){n="&"}for(i in e){r=e[i];if(t&&!isNaN(i)){i=String(t)+i}var a=u(i,r,n);if(a!==""){s.push(a)}}return s.join(n)};
 