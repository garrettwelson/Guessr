const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/words', (req, res) => {
  const prefs = req.query;
  console.log(prefs);
  axios
    .get(
      `http://app.linkedin-reach.io/words?count=${prefs.count}&difficulty=${prefs.difficulty}&start=${prefs.start}`
    )
    .then(response => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(err => res.send(err));
});

module.exports = app;
