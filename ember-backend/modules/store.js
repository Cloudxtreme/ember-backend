var req = require('request');
var pluralize = require('pluralize');

exports.store = function(method, modelName, id, query){

  var self = this;

  self.host = F.config['ember.adapter.host'];
  self.namespace = F.config['ember.adapter.namespace'];

  self.response = {};


  var prepareRequest = function(method, modelName){
    var url = buildURL(method, modelName);
    return request(url);
  };



  var buildURL = function(method, modelName, id, query){
    switch (method){
      case 'findRecord':
        return _buildURL(modelName, id);
      case 'query':
        return _buildURL(modelName);
      default:
        return _buildURL(modelName, id);
    }
  };


    /**
     * @method _buildURL
     * @param modelName
     * @param id
     * @returns {String} url
     * @private
     */
  var _buildURL = function(modelName, id){
    var url = [];
    var host = self.host;
    var path;
    var prefix = self.namespace;

    if (host){
      url.push(host);
    }

    if (prefix){
      url.push(prefix);
    }

    if (modelName){
      path = pathForType(modelName);
      if (path) { url.push(path); }
    }

    if (id){ url.push(encodeURIComponent(id)); }

    url = url.join('');
    if (!host && url && url.charAt(0) !== '/') {
      url = '/' + url;
    }

    return url;

  };


  /**
   * Get path name based on model name
   * @param modelName
   * @returns {*}
     */
  var pathForType = function(modelName){
    var path = pluralize(modelName);
    path = (path.charAt(0) === '/') ? path : '/' + path;
    return path;
  };



  var request = function(url, options){
    if (!options.url) {options.url = url}
    if (options){ options = requestOptions(url, options); }

    var response = null;

    console.log('before request');
    req(options, function (error, response, body) {
      console.log('in request');
      response = handleResponse(error, response, body);
    });
    console.log('after request');
    return response;
  };


  /**
   *
   * @param url
   * @param options
   * @returns {*|{}}
     */
  var requestOptions = function(url, options){
    var hash = options || {};
    hash.url = url;
    hash.json = true;

    if (query){
      hash.qs = query;
    }

    // TODO add headers support here
    //hash.headers = {
    //  'User-Agent': 'Test'
    //}

    return hash;
  };


  /**
   *
   * @param error
   * @param response
   * @param body
   * @returns {*}
     */
  var handleResponse = function(error, response, body){
    if (error){
      // TODO Handle request error
      console.log('Request Failed', error);
    }else if (response.statusCode !== 200){
      // TODO Handler server error
      console.log('API Server failed');
    }else{
      return body;
    }
  };



  /**
   *
   * @param callback
     */
  self.then = function(callback){

    var url = buildURL(method, modelName, id, query);
    var options = requestOptions(url);

    var response = request(url, options);

    console.log( response);

    var error = null;
    callback(error, response);
  };



  return this;
};
