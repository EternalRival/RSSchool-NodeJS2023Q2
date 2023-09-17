export class WrongCommandError extends Error {
  constructor() {
    super('Wrong command');
  }
}
