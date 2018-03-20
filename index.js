const Twit = require('twit');
const rita = require('rita');

const T = new Twit({
  consumer_key: '...',
  consumer_secret: '...',
  access_token: '...',
  access_token_secret: '...',
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
});

const madlib = (noun, verb) => `${noun} cat. The cat that ${verb} ${noun}!`;

const post = status =>
  T.post('statuses/update', { status }, (err, data, response) => {
    console.log(data);
  });