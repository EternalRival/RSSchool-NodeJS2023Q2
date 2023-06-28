import http from 'http';

const message = 'Hello';

const server = http.createServer((req, res) => {
  res.end(`${message}`);
});
server.listen(3000);
