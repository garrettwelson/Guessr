const express = require('express');
const axios = require('axios');
const cookieSession = require('cookie-session');

const app = express();

app.use(express.static('public'));

app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  })
);

app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/prefs', (req, res) => {});

app.get('/words', (req, res) => {
  const prefs = req.query;
  axios
    .get(`http://app.linkedin-reach.io/words?difficulty=${prefs.difficulty}`)
    .then(response => {
      const words = response.data.split('\n');
      const index = Math.floor(Math.random() * words.length) + 1;
      res.send(words[index]);
    })
    .catch(err => res.send(err));
});

module.exports = app;
