export default {
  get: get
}

/**
 * @param {String} url
 * @param {Object} params
 * @param {Function} callback
 */
function get(url, params, callback) {
  xhr('GET', url + paramsToQuery(params), null, callback);
}

function xhr(method, url, body, callback) {
  var req = new XMLHttpRequest();

  req.open(method, url, true);

  req.send(body);

  req.onreadystatechange = stateChangeHandler;

  function stateChangeHandler() {
    if (req.readyState != 4) return;

    if (req.status != 200) throw `${req.status}: ${req.statusText}`;

    callback(JSON.parse(req.responseText));
  }
}

function paramsToQuery(params) {
  return !params ? '' : '?' + Object.keys(params).map(transform).join('&');

  function transform(paramName) {
    return `${paramName}=${params[paramName]}`;
  }
}