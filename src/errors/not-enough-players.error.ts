export class NotEnoughPlayersError extends Error {
  constructor() {
    super('Not enough players to start game');
  }
}
