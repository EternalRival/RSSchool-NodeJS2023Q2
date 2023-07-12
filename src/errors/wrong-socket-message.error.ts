export class WrongSocketMessageError extends Error {
  constructor() {
    super('Wrong socket message');
  }
}
