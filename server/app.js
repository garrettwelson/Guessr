const express = require('express');
const axios = require('axios');
// const cors = require('cors');

const app = express();

app.use(express.static('public'));
// app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send();
});

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
