# Ember-backend

This module is intended to render the Ember applications on the server, without using any prerendering engine,
such as PhantomJS or other. What we're trying to achieve is to create a wrapper using `Total.js` framework,
that executes the exact same ember templates and other logic related code.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/) (for testing)
* [Total.js](https://www.totaljs.com/)

## Installation

* `git clone https://github.com/Polyzor/ember-backend.git ./ember-backend` this repository
* `cd ember-backend`
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* `node ember-backend/debug.js` (in another terminal)
* Visit your app at (Ember) [http://localhost:4200](http://localhost:4200).
* Visit your app at (Total) [http://localhost:4201](http://localhost:4201).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

