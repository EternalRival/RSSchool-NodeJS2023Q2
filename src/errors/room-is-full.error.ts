export class RoomIsFullError extends Error {
  constructor() {
    super('Room is full');
  }
}
