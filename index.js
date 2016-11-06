const {send, sendError, json} = require('micro');
const globalRouter = require('./router');

module.exports = exports = serve;
exports.__defineGetter__('router', () => globalRouter);

async function serve(req, res) {
  const handler = globalRouter.match(req, res, { json });
  if (!handler) {
    // we want error with json body
    res.setHeader('content-type', 'application/json');
    const err = new Error('Not Found');
    err.message = JSON.stringify({ message: 'Not Found' });
    err.statusCode = 404;
    return sendError(req, res, err);
  }

  try {
    return await handler();
  } catch (err) {
    if (typeof err.message === 'string') {
      try {
        const obj = JSON.parse(err.message);
        if (typeof obj === 'object') {
          res.setHeader('content-type', 'application/json');
        }
      } catch (exception) {
        sendError(req, res, err);
      }
    }
  }
}
