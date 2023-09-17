export class InvalidDataError extends Error {
  constructor(message: string) {
    super(`Invalid${message ? ` ${message} ` : ' '}data`);
  }
}
