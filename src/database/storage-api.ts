import { User } from './user.entity';

export class Database {
  private static players: Map<string, User> = new Map();

  public static addUser(login: string, password: string): User | Error {
    if (this.players.get(login)) {
      return new Error('User already exists');
    }

    const user = new User(login, password);

    this.players.set(login, user);

    return user;
  }

  public static getUser(login: string, password: string): User | Error {
    const user = this.players.get(login);

    if (!user) {
      return new Error('User not found');
    }

    if (password !== user.password) {
      return new Error('Wrong password');
    }

    return user;
  }
}
