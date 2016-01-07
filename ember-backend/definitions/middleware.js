F.middleware('EmberRouter', function(req, res, next, options, controller){

  if (!controller) next();

  controller.repository.ember = {};

  var EmberRouter = new U.EmberRouter(req);
  controller.repository.ember.template  = EmberRouter.getTemplate();
  controller.repository.ember.method    = EmberRouter.getMethod();
  controller.repository.ember.model     = EmberRouter.getModel();
  controller.repository.ember.by        = EmberRouter.getBy();
  controller.repository.ember.query     = EmberRouter.getQuery();

  next();
});


F.middleware('TestUnit', function(req, res, next, options, controller){
  if (!controller) next();

  if (TEST){
    var hash = {
      template  : controller.repository.ember.template,
      store     : controller.repository.ember.method,
      model     : controller.repository.ember.model
    };
    controller.header('X-EMBER-TEST', JSON.stringify(hash));
  }
  next();

});
