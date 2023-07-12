import { WebSocket } from 'ws';
import { Counter } from '../helpers/counter';
import { User } from './user';
import { randomRepeat } from '../helpers/random-repeat';

export class Users {
  private static id = new Counter();

  private static players: Map<string, User> = new Map();

  private static addUser(login: string, password: string): User {
    const user = new User(this.id.next(), login, password);

    this.players.set(login, user);

    return user;
  }

  public static verifyUser(login: string, password: string): User {
    const user = this.players.get(login);

    if (!user) {
      return this.addUser(login, password);
    }

    if (!user.verifyPassword(password)) {
      throw new Error(`Wrong password${randomRepeat('!', 4)}`);
    }

    return user;
  }

  public static getUserBySocket(socket: WebSocket): User {
    const user = Array.from(this.players.values()).find((item) => item.socket === socket);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public static getUserById(id: number): User {
    const user = Array.from(this.players.values()).find((item) => item.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
