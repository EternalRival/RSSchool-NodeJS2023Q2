import { WebSocket } from 'ws';

export class User {
  public socket?: WebSocket;

  constructor(
    public id: number,
    public login: string,
    private password: string,
  ) {}

  public verifyPassword(password: string): boolean {
    return password === this.password;
  }
}
