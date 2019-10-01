const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).send();
});

module.exports = app;
