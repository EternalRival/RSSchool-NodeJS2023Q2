import { User } from './user.entity';

export class Database {
  private static lastId = 0;

  private static players: Map<string, User> = new Map();

  private static addUser(login: string, password: string): User {
    const user = new User(this.lastId, login, password);

    this.players.set(login, user);
    this.lastId += 1;

    return user;
  }

  public static verifyUser(login: string, password: string): User {
    const user = this.players.get(login);

    if (!user) {
      return this.addUser(login, password);
    }

    if (password !== user.password) {
      throw new Error('Wrong password');
    }

    return user;
  }
}
