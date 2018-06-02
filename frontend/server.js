const express = require('express');
const next = require('next');
const fetch = require('isomorphic-unfetch');
const dev = process.env.NODE_ENV !== 'production';
console.log({ dev });
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get('/a/:id', async (req, res) => {
      const actualPage = '/cake';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      // console.log(req);
      // console.log(req.cookies);
      return handle(req, res);
    });

    server.listen(8080, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:8080');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
