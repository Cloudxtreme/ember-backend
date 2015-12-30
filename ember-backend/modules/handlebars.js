// MIT License
// Copyright Peter Širka <petersirka@gmail.com>
// Version 1.00

var fs = require('fs');
var path = require('path');
var layouts = require('handlebars-layouts');
global.Handlebars = require('handlebars');


var root = path.join(__dirname, '../../');
var views_dir = path.join(root, '/app/templates');
var components_dir = path.join(root, '/app/templates/components');

Handlebars.registerHelper(layouts(Handlebars));

var components = fs.readdirSync(components_dir);

components.forEach(function (filename) {
    Handlebars.registerPartial(filename.substr(0, filename.indexOf('.')),
      fs.readFileSync(path.join(components_dir, filename), 'utf8'));
});

//Handlebars.registerPartial('layout', fs.readFileSync(framework.path.views('layout.hbs'), 'utf8'));


Handlebars.registerHelper('unescape', function(options) {
    return options;
});

Handlebars.registerHelper('action', function(options) {
    return options;
});


//var Remarkable = require('remarkable');
//Handlebars.registerHelper('md-text', function (params) {
//    var md = new Remarkable({
//        typographer: params.hash.typographer || false,
//        linkify: params.hash.linkify || false,
//        html: params.hash.html || false,
//    });
//    var html = md.render(params.hash.text);
//    return new Handlebars.SafeString(html);
//});
//
//Handlebars.registerHelper('link-to', function(route, params, options){
//    var href = (!params) ? '/' + route : '/' + route + '/' + params;
//    return '<a href="'+ href +'" >'+ options.fn(this) +'</a>';
//});


Handlebars.registerHelper('content-for', function(options){

  // TODO: create a more elegant way of handling "content-for" hooks rather than replace them
  // this functionality is just a mockup, the actual logic is hardcodded inside /modules/controller.js
  // index = index.replace("{{content-for 'body'}}", layout);

  var content = '';

  switch (options){
    case 'head':
      break;
    case 'head-footer':
      break;
    case 'body':
      break;
    case 'body-footer':
      break;
  }

  return new Handlebars.SafeString(content);

});

//Handlebars.registerHelper('outlet', function(){
//  var name = framework.global.emberView;
//  var filename = U.concat(name, '.hbs');
//
//  var view = fs.readFileSync(framework.path.emberTemplates(filename).toString('utf8'));
//
//  var key = 'handlebars_' + name;
//  var fn = framework.cache.read(key);
//
//  //console.log(Handlebars.precompile(view));
//  //fn = Handlebars.compile(view, 'undefined');
//
//  //console.log(fn());
//
//  return '';
//});

Handlebars.registerHelper('link-to', function (route, param, options) {
  var href = (route === 'index') ? '/' : '/' + route.replace('.', '/');

  var text = '';
  var self = this;
  self.attrs = [];

  if (options){
    // When: {{#link-to 'route' 'param'}}
    text = options.fn(this);
    href = U.concat(href, '/', param);

    buildAttrs(options.hash);
  }else{
    // When: {{#link-to 'route'}}
    text = param.fn(this);
    buildAttrs(param.hash);
  }

  function buildAttrs(hash){
    if (!Object.keys(hash).length) return;
    for (var attr in hash){
      attr = U.concat(Handlebars.escapeExpression(attr), '=', '"', Handlebars.escapeExpression(hash[attr]), '"');
      self.attrs.push(attr);
    }
  }

  var link = '<a href="' + href + '" '+ self.attrs.join(' ') +'>'+ text +'</a>';
  return new Handlebars.SafeString(link);

});

exports.name = 'handlebars';
exports.version = '1.00';

exports.helper = function(name, fn) {
    Handlebars.registerHelper(name, fn);
};

exports.partial = function(name, value) {
    Handlebars.registerPartial(name, value);
};
