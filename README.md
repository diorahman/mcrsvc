## mcrsvc

[![Build Status](https://travis-ci.org/diorahman/mcrsvc.svg?branch=master)](https://travis-ci.org/diorahman/mcrsvc)

micro + routes! <3.

## install
```
$ npm install mcrsvc --save
```

## example

```js
// using promise
const app = require('mcrsvc');

app.router.add('GET', '/hello', (req, res) => {
  // some async process
  return new Promise((resolve) => {
    setTimeout(() => resolve({'OK': 1}), 100);
  });
});
```


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

// to make it standalone, you might need babel or async-to-gen.
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
