import { WebSocket, WebSocketServer } from 'ws';
import { MessageType } from '../socket-message/enums/message-type.enum';
import { logResponse } from '../helpers/log';
import { SocketMessage } from '../socket-message/interfaces/socket-message.interface';

export function sendResponse(target: WebSocket | WebSocketServer, type: MessageType, data: object): void {
  if (target instanceof WebSocket && target.readyState === WebSocket.OPEN) {
    const response: SocketMessage = { type, data: JSON.stringify(data), id: 0 };
    target.send(JSON.stringify(response));
    logResponse(response);
  } else if (target instanceof WebSocketServer) {
    target.clients.forEach((client) => sendResponse(client, type, data));
  }
}
