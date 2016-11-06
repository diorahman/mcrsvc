const {parse} = require('url');
const route = require('path-match')();

class Router {
  constructor() {
    this.routes = new Map();
  }

  get(path, handler) {
    this.add('GET', path, handler);
  }

  add(method, path, handler) {
    if (typeof method !== 'string') {
      throw new TypeError('`method` is required!');
    }

    if (typeof path !== 'string') {
      throw new TypeError('`path` is required!');
    }

    if (typeof handler !== 'function') {
      throw new TypeError('`handler` is required!');
    }

    const routes = this.routes.get(method) || new Set();
    routes.add({
      match: route(path),
      handler
    });

    this.routes.set(method, routes);
  }

  match(req, res, { json }) {
    const routes = this.routes.get(req.method);
    if (!routes) {
      return;
    }

    const {pathname, query} = parse(req.url, true);
    for (const r of routes) {
      const params = r.match(pathname);

      if (params) {
        return async () => {
          req.params = params;
          req.query = query;

          if (['POST', 'PUT'].indexOf(req.method) >= 0 &&
            req.headers['content-type'].startsWith('application/json') &&
            typeof json === 'function') {
              // we only support json
              req.body = await json(req);
          }

          return r.handler(req, res);
        }
      }
    }
  }
}

module.exports = new Router();
