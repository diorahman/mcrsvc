## mcrsvc

micro + routes! <3.

## example

```js
const app = require('mcrsvc');

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
const micro = require('micro');
micro(app)
  .listen(3000, (err) => {
    if (err) {
      throw err;
    }
    console.log('~>', 3000);
  });
```

## license

MIT
