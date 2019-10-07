const app = require('./app.js');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on ${port}`);
});
