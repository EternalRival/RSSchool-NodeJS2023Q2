export class NotFoundError extends Error {
  constructor(message: string) {
    super(`${message ? `${message} n` : 'N'}ot Found`);
  }
}
