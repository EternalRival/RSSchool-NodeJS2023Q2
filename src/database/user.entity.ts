import { UserData } from './user.interface';

export class User implements UserData {
  constructor(
    public id: number,
    public login: string,
    public password: string,
  ) {}
}
