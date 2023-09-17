import { client } from './client';
import { cyan, yellow } from './helpers/colorize';
import './ws-server';

const HTTP_PORT = 8181;

console.log(`${cyan('Start static http server on the ')}${yellow(`${HTTP_PORT}`)}${cyan(' port!')}`);
client.listen(HTTP_PORT);
