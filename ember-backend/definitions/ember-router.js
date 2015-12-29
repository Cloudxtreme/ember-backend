
/**
 *
 * @param uri
 * @returns {U.EmberRouter}
 * @constructor
 */

U.EmberRouter = function(request){

  var self = this;
  self.request = request;

  self.view = 'index';

  init = function(){
     self._parseURL();
  };

  self.isValid = function(url){
    self.url = url;
    return Utils.isURL(url)
  };


  self.getView = function(){
    return self.view;
  };

  self._setView = function(view){
    self.view = view;
  };

  self._parseURL = function(){
    if (!self.request.uri.path) return;
    if (self.request.uri.path === '/') return;


    console.log(self.request);
  };



  self._emberInit = function(){

  };


  init();
  return self;
};
