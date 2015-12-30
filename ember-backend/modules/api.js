var request = require('request');

var api = 'http://localhost:4200/api/v1/posts';
var options = {
  url: api,
  json: true
};

exports.query = function(model, params, clb){

  request(options, function (error, response, body) {

    if (error) {
      clb(error)
    } else if (response.statusCode !== 200) {
      clb('Server error')
    } else {
      clb(null, body)
    }

  })

};
