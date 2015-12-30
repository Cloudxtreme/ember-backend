exports.install = function() {
	F.route('/*', view_index);
};

function view_index() {
	var self = this;
  var request = self.req;

  var emberRouter = new U.EmberRouter(request);

  var view = emberRouter.getView();

  MODULE('api').query('post', {}, function (err, result) {
    if (err) {
      self.view('error', {error: err})
    } else {
      self.view(view, {model: result.posts});
    }
  });
}


