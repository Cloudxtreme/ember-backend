exports.install = function() {
	F.route('/*', view_index);
};

function view_index() {
	var self = this;
  var request = self.req;

  var emberRouter = new U.EmberRouter(request);

  var view = emberRouter.getView();




	self.view(view);
}


