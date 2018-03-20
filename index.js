const Twit = require('twit');
const rita = require('rita');
const fs = require('fs');
require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

// const { generate } = require('./generate');
// generate(); run when redoing nouns or verbs.txt

const capitalize = word => word[0].toUpperCase() + word.substr(1);
Array.prototype.pick = function() {
  return this[Math.floor(Math.random() * this.length)];
};

const noun = require('./nouns.txt')
  .split('\n')
  .pick();
const verb = require('./verbs.txt')
  .split('\n')
  .pick();

const madlib = (noun, verb) =>
  `${capitalize(noun)} cat. The cat that ${verb} ${rita.pluralize(noun)}!`;

console.log(madlib(noun, verb));

const T = new Twit({
  consumer_key: '...',
  consumer_secret: '...',
  access_token: '...',
  access_token_secret: '...',
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
});

const post = status =>
  T.post('statuses/update', { status }, (err, data, response) => {
    console.log(data);
  });

// post(madlib(noun, verb));
