import { client } from './client';

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
client.listen(HTTP_PORT);
