
/**
 *
 * @param request
 * @returns {U.EmberRouter}
 * @constructor
 */

U.EmberRouter = function(request){

  /**
   * Internal scope
   * @type {U.EmberRouter}
     */
  var self = this;


  self.config = {
    route: {},
    model: {},
    store: {}
  };

  /**
   * Full request object
   * @type {Controller.req}
   */
  self.request = request;


  /**
   * Model Record by
   * @type {null} | {string} | {number}
     */
  self.by = null;


  /**
   * Key value pairs router query params
   * @type {Object}
     */
  self.query = {};


  /**
   * Ember template name
   * @type {string}
     */
  self.template = 'index';


  /**
   * Ember Store method
   * @type {string}
   */
  self.method = 'query';

  /**
   * Ember Model
   * @type {null}
     */
  self.model = null;


  /**
   * Request Route using dot (.) notation
   * @type {string}
     */
  self.route = 'index';


  /**
   * Initialize Ember wrapper
   */
  init = function(){
    self._initConfig();
    self._parseURI();
  };


  /**
   * Iterate framework config and extract ember related data
   * @private
     */
  self._initConfig = function(){
    var fconfig = F.config;
    Object.keys(fconfig).some(function(k){
      if (!k.indexOf("ember")){
        if (/^ember.route/.test(k)){
          self.config.route[k] = fconfig[k];
        }else if (/^ember.model/.test(k)){

          try {
            JSON.parse(fconfig[k]);
            self.config.model[k] = JSON.parse(fconfig[k])
          }catch (err){
            self.config.model[k] = fconfig[k];
          }

        }else if (/^ember.store/.test(k)){

          try {
            JSON.parse(fconfig[k]);
            self.config.store[k] = JSON.parse(fconfig[k])
          }catch (err){
            self.config.store[k] = fconfig[k];
          }

        }else{
          self.config[k] = fconfig[k];
        }
      }
    });

  };


  /**
   * TODO This method is not implemented. Should read config file for valid Ember routes and throw 404 otherwise.
   * Check if the request url is valid, otherwise throw a 404 error
   * @param url
     */
  self.isValid = function(url){
    self.url = url;
    return Utils.isURL(url)
  };


  /**
   * Get Ember template name
   * @returns {string}
     */
  self.getTemplate = function(){
    return self.template;
  };


  /**
   * Set Ember template name
   * @param template
   * @private
     */
  self._setTemplate = function(template){
    self.template = template;
  };


  /**
   * Parse request URI and extract data
   * @private
     */
  self._parseURI = function(){
    var _path = self.request.path.join('/');
    var _dotpath = _path.replace(/\//g, '.');

    // Verify if route is static or dynamic
    if (self.config.route['ember.route.' + _dotpath]){

      // Set Current route
      self.route = _dotpath;

      // Static route. Set template path as is
      self._setTemplate(_path);

    }else{

      // Dynamic route. Process path and extract route params
      _path = self.request.path;
      _path.some(function(key){
        var _pop = _path.pop();
        _dotpath = _path.join('.');
        if (self.config.route['ember.route.' + _dotpath]){

          // This route has a dinamic parameter. Set it.
          self.by = _pop;

          // Set Current route
          self.route = _dotpath;

          var _template = _path.join('/');

          // Check if this route has child routes
          var _occ = 0;
          Object.keys(self.config.route).some(function(key){
            var _r = U.concat('ember.route.', _path);
            if (key.startsWith(_r)){
              _occ++
            }
          });

          if (_occ > 1){
            _template = U.concat(_template, '/index');
          }

          self._setTemplate(_template);
          return true;
        }
      });

    }
  };


  /**
   *  Get store method based on request url
   * @returns {string}
     */
  self.getMethod = function(){
    self.method = (self.config.store['ember.store.' + self.route])
      ? self.config.store['ember.store.' + self.route]
      : self.method;
    return self.method;
  };


  /**
   * Get model based on request url
   * @returns {string}
     */
  self.getModel = function(){
    self.model = (self.config.model['ember.model.' + self.route])
      ? self.config.model['ember.model.' + self.route]
      : self.model;
    return self.model;
  };


  self.getBy = function(){
    return self.by;
  };


  self.getQuery = function(){
    return self.request.query;
  };


  init();
  return self;
};
