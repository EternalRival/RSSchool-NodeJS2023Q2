export class AlreadyInAnotherLobbyError extends Error {
  constructor() {
    super('User is already in another lobby');
  }
}
