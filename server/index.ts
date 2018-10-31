import * as express from 'express';
import * as compression from 'compression';
import * as next from 'next';
import { Router } from './people';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(compression());

    server.use(Router);
    
    server.get('/podcaster/:id', (req, res) => {
      const actualPage = '/podcaster';
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    });
  });
