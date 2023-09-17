import { WebSocketServer } from 'ws';
import { handleClientMessage } from '../commands';
import { logError } from '../helpers/log';
import { cyan, yellow } from '../helpers/colorize';

const WSS_PORT = 3000;

const wss: WebSocketServer = new WebSocketServer({ port: WSS_PORT });

wss.on('listening', function cb(): void {
  const port = this.options.port ?? 'unknown';
  console.log(`${cyan('Start ws-server on the ')}${yellow(`${port}`)}${cyan(' port!')}`);
  console.log('websocket parameters:', this.address());
});

wss.on('connection', (client) => {
  client.on('error', console.error);
  client.on('message', function handleMessage(data): void {
    try {
      handleClientMessage(wss, this, JSON.parse(data.toString()));
    } catch (err) {
      logError(err);
    }
  });
});
