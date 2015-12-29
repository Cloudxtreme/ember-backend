// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function(app) {
  var globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  // Log proxy requests
  var morgan  = require('morgan');
  app.use(morgan('dev'));

  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });

  app.get('/api/v1/posts/:id?', function(req, res){

    var id = req.params['id'] || null;

    var posts = {
      posts: [
        {
          id: 0,
          title: "My first post",
          content: "Lorem ipsum content"
        },

        {
          id: 1,
          title: "My second post",
          content: "Lorem ipsum content"
        }

      ]
    };

    var response = (id) ? {posts: posts.posts[id]} : posts;

    res.send(response);


  })

};
