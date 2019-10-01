const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).send();
});

app.get('/firebaseTest', (req, res) => {
  res.status(200).send('Firebase works!');
});

module.exports = app;
