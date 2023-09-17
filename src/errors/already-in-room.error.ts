export class AlreadyInRoomError extends Error {
  constructor() {
    super('User already in room');
  }
}
