import { WebSocketServer } from 'ws';
import { handleClientMessage } from '../commands';

const WSS_PORT = 3000;

const wss: WebSocketServer = new WebSocketServer({ port: WSS_PORT });

wss.on('listening', function cb(): void {
  const port = this.options.port ?? 'unknown';
  console.log(`Start ws-server on the ${port} port!`);
  console.log('websocket parameters:', this.address());
});

wss.on('connection', (client) => {
  client.on('error', console.error);
  client.on('message', function handleMessage(data): void {
    handleClientMessage(wss, this, JSON.parse(data.toString()));
  });
});
