import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { createServer } from 'http';

const clientPath = resolve(__dirname, '..', '..', 'front');

export const client = createServer((req, res): void => {
  const endpoint = req.url?.slice(1) || 'index.html';
  const filePath = resolve(clientPath, endpoint);
  readFile(filePath)
    .then((data) => {
      res.writeHead(200);
      res.end(data);
    })
    .catch((e) => {
      res.writeHead(404);
      res.end(JSON.stringify(e));
    });
});
