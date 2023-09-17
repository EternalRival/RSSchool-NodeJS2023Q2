export class PlayerDisconnectedError extends Error {
  constructor() {
    super('Some player was disconnected');
  }
}
