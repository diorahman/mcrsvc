const request = require('request-promise');
const micro = require('micro');
const test = require('ava');
const app = require('../');

const listen = (fn, opts) => {
  const server = micro(fn, opts);

  return new Promise((resolve, reject) => {
    server.listen((err) => {
      if (err) {
        return reject(err);
      }

      const {port} = server.address();
      resolve(`http://localhost:${port}`);
    });
  });
}

test('ok', async (t) => {
  app.router.add('GET', '/foo1', async (req, res) => {
    return {say: 'world'};
  });
  const url = await listen(app);
  const body = await request({uri: `${url}/foo1`, json: true});
  t.deepEqual(body.say, 'world');
});

test('params', async (t) => {
  app.router.add('GET', '/foo2/:id', async (req, res) => {
    return req.params;
  });
  const url = await listen(app);
  const body = await request({uri: `${url}/foo2/1`, json: true});
  t.deepEqual(body.id, '1');
});

test('query', async (t) => {
  app.router.add('GET', '/foo3', async (req, res) => {
    return req.query;
  });
  const url = await listen(app);
  const body = await request({uri: `${url}/foo3?id=1`, json: true});
  t.deepEqual(body.id, '1');
});

test('body', async (t) => {
  app.router.add('POST', '/foo4', async (req, res) => {
    return req.body;
  });
  const url = await listen(app);
  const body = await request({uri: `${url}/foo4`, method: 'POST', json: true, body: { id: '1' }});
  t.deepEqual(body.id, '1')
});
