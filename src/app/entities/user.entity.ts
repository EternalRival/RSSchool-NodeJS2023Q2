import { UserInterface } from '../interfaces/user.interface';

export class User implements UserInterface {
  constructor(
    public readonly id: string,
    public username: string,
    public age: number,
    public hobbies: string[],
  ) {}
}
