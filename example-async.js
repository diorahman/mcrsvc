// to run this example, you need async-node from async-to-gen
// or babel-cli
const micro = require('micro');
const app = require('./dist');

app.router.add('GET', '/hello/:id', async (req, res) => {
  return req.params;
});

app.router.add('POST', '/hello/:id', async (req, res) => {
  return req.body;
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
