export class NotImplementedError extends Error {
  constructor(message?: string) {
    super(`${message ? `${message} n` : 'N'}ot implemented`);
  }
}
