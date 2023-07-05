import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

export const httpServer = http.createServer((req, res) => {
  const dirname = path.resolve(path.dirname('')); // todo refactor
  const filePath = path.resolve(dirname, req.url === '/' ? '/front/index.html' : `/front${req.url ?? ''}`); // todo refactor
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});
