const micro = require('micro');
const app = require('./dist');

app.router.add('GET', '/hello', (req, res) => {
  // some async process
  return new Promise((resolve) => {
    setTimeout(() => resolve({'OK': 1}), 100);
  });
});

// module.exports = app;
// put it in index.js, then
// $ micro -p 3000

// to make it standalone
micro(app)
  .listen(3000, (err) => {
    if (err) {
      throw err;
    }
    console.log('~>', 3000);
  });
