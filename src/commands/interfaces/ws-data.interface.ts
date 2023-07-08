import { WebSocket, WebSocketServer } from "ws";

export interface WSData {
  server: WebSocketServer;
  client: WebSocket;
}
