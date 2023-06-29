import http from 'http';
import { AppProperties } from './app-properties.interface';
import { inject } from '../helpers/inject';

export class AppController {
  port = 3000;

  constructor(props: AppProperties) {
    inject(this, props);
  }

  createServer() {
    const server = http.createServer((req, res) => {
      res.end('sup');
    });
    server.listen(this.port);
  }
}
