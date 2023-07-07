import { UserData } from './user.interface';

export class User implements UserData {
  constructor(
    public login: string,
    public password: string,
  ) {}
}
