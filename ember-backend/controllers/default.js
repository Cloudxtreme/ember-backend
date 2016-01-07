exports.install = function() {
	F.route('/*', view, ['#EmberRouter', '#TestUnit']);
};

function view() {
	var self = this;

  var template  = self.repository.ember.template;
  var method    = self.repository.ember.method;
  var model     = self.repository.ember.model;
  var by        = self.repository.ember.by;
  var query     = self.repository.ember.query;

  MODULE('store').store(method, model, by, query).then(function(error, response){
    console.log("\n");
    console.log("Response:", response);
    self.view(template);
  });



  //MODULE('store').store(store, model, by, {}, function (err, result) {
  //  if (err) {
  //    self.view('error', {error: err})
  //  } else {
  //    self.view(template, {model: result});
  //  }
  //});
}


