var fs = require('fs');

exports.run = function() {


  var logger = function(template, templateExists, data){
    console.log('\n');
    console.log('Expected template .. :', template);
    console.log('Recieved template .. :', data.template);
    console.log('Template exists .... :', templateExists);
    console.log('Store .............. :', data.store);
    console.log('Model .............. :', data.model);
  };

  /**
   * INDEX ROUTE
   */
  F.assert("Test Route: 'index' [/]", '/', ['get'], function(error, data, code, headers, cookies, name){
    var ember = JSON.parse(headers['x-ember-test']);
    var template = 'index';
    var templateExists = fs.existsSync(framework.path.emberTemplates(U.concat(template, '.hbs')));


    logger(template, templateExists, ember);
    assert.ok(
      code === 200 &&
      ember.template === template &&
      templateExists &&
      ember.store === 'query'
    );
  });


  /**
   * POST DETAILS ROUTE
   */
  F.assert("Test Route: [post/:id]", '/post/0', ['get'], function(error, data, code, headers, cookies, name){
    var ember = JSON.parse(headers['x-ember-test']);
    var template = 'post/index';
    var templateExists = fs.existsSync(framework.path.emberTemplates(U.concat(template, '.hbs')));

    logger(template, templateExists, ember);
    assert.ok(
      code === 200 &&
      ember.template === template &&
      templateExists
    );
  });


  /**
   * EDIT POST ROUTE
   */
  F.assert("Test Route: [post/edit/:id]", '/post/edit/0', ['get'], function(error, data, code, headers, cookies, name){
    var ember = JSON.parse(headers['x-ember-test']);
    var template = 'post/edit';
    var templateExists = fs.existsSync(framework.path.emberTemplates(U.concat(template, '.hbs')));

    logger(template, templateExists, ember);
    assert.ok(
      code === 200 &&
      ember.template === template &&
      templateExists
    );
  });

};
