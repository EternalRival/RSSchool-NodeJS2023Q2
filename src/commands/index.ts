import { WebSocket, WebSocketServer } from 'ws';
import { validateClientMessage } from '../socket-message/validate-socket-message';

export function handleClientMessage(server: WebSocketServer, client: WebSocket, message: unknown): void {
  const socketMessage = validateClientMessage(message);
  if (!socketMessage) {
    console.error('wrong socket message');
    return;
  }
  const { type, data, id } = socketMessage;
  console.log('<-', type, data, id);
  client.send('pong');
}
