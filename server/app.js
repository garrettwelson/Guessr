const express = require('express');
const axios = require('axios');
const cookieSession = require('cookie-session');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  })
);

app.get('/', (req, res) => {
  res.status(200).send();
});

app.put('/prefs', (req, res) => {
  req.session.username = req.body.username;
  req.session.difficulty = req.body.difficulty;
  res.end();
});

app.put('/streaks', (req, res) => {
  const win = req.body.result;
  if (win) {
    req.session.currentStreak += 1;
    if (req.session.currentStreak > req.session.maxStreak) {
      req.session.maxStreak = req.session.currentStreak;
    }
  } else if (!win) {
    req.session.currentStreak = 0;
  }
  res.end();
});

app.get('/words', (req, res) => {
  req.session.username = req.session.username || '';
  req.session.difficulty = req.session.difficulty || 3;
  req.session.currentStreak = req.session.currentStreak || 0;
  req.session.maxStreak = req.session.maxStreak || 0;
  console.log(req.session);
  axios
    .get(`http://app.linkedin-reach.io/words?difficulty=${req.session.difficulty}`)
    .then(response => {
      const words = response.data.split('\n');
      const index = Math.floor(Math.random() * words.length) + 1;
      console.log(words[index]);
      res.send({
        word: words[index],
        username: req.session.username,
        difficulty: req.session.difficulty,
        currentStreak: req.session.currentStreak,
        maxStreak: req.session.maxStreak
      });
    })
    .catch(err => res.send(err));
});

module.exports = app;
