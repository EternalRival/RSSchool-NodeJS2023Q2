import { WebSocket } from 'ws';
import { Counter } from '../helpers/counter';
import { User } from './user';
import { WrongPasswordError } from '../errors/wrong-password.error';
import { NotFoundError } from '../errors/not-found.error';

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
      throw new WrongPasswordError();
    }

    return user;
  }

  public static getUserBySocket(socket: WebSocket): User {
    const user = Array.from(this.players.values()).find((item) => item.socket === socket);
    if (!user) {
      throw new NotFoundError('User');
    }
    return user;
  }

  public static getUserById(id: number): User {
    const user = Array.from(this.players.values()).find((item) => item.id === id);
    if (!user) {
      throw new NotFoundError('User');
    }
    return user;
  }
}
