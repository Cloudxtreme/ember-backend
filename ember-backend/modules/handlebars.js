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
  return ''
});


exports.name = 'handlebars';
exports.version = '1.00';

exports.helper = function(name, fn) {
    Handlebars.registerHelper(name, fn);
};

exports.partial = function(name, value) {
    Handlebars.registerPartial(name, value);
};
