import { randomRepeat } from '../helpers/random-repeat';

export class WrongPasswordError extends Error {
  constructor() {
    super(`Wrong password${randomRepeat('!', 4)}`);
  }
}
