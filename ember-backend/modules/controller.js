var fs = require('fs');
var path = require('path');

var ember = path.join(__dirname, '../../app');

//framework.config['directory-ember'] = ember;


var definition = (function () {

  // Define Framework Path prototype for Root
  FrameworkPath.prototype.root = function(filename) {
    filename = (filename) ? '../../' + filename : '../../';
    var p = path.join(__dirname, filename);
    return framework.isWindows ? p.replace(/\\/g, '/') : p;
  };


  FrameworkPath.prototype.emberTemplates = function(filename) {
    return path.join(framework.path.root(), 'app', 'templates', filename);
  };



  /*
   Override controller view method
   */
  Controller.prototype.view = function (name, model, headers, isPartial) {
    var self = this;



    // Get Ember's index.html content
    var index = fs.readFileSync(framework.path.root('app/index.html')).toString('utf8');
    var layout = fs.readFileSync(framework.path.emberTemplates('application.hbs').toString('utf8'));
    index = index.replace("{{content-for 'body'}}", layout);



    // Check if cache exists
    var key = 'handlebars_' + name;
    var fn = framework.cache.read(key);



    // Compile index.html
    fn = Handlebars.compile(index, options);



    // Return a response
    self.subscribe.success();
    if (self.isConnected) {
      framework.responseContent(self.req, self.res, self.status, fn(model), 'text/html', true, headers);
      framework.stats.response.view++;
    }
    return self;
  };
});

setTimeout(function() {
  framework.eval(definition);
}, 100);
