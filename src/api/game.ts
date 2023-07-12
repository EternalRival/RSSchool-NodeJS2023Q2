import { WebSocket } from 'ws';
import { Ship } from '../commands/interfaces/shared/ship.interface';
import { User } from './user';
import { sendResponse } from '../commands/send-response';
import { MessageType } from '../socket-message/enums/message-type.enum';
import { AttackRequestData } from '../commands/interfaces/game/attack.request.interface';

export class Game {
  private turnCounter = -1;

  constructor(
    private users: User[],
    private ships: Map<number, Ship[]>,
  ) {
    this.sendTurn();
  }

  private checkDisconnected(): void | never {
    if (!this.users.every((user) => user.socket?.readyState === WebSocket.OPEN)) {
      throw new Error('Some player was disconnected');
    }
  }

  private nextTurn(): void {
    this.turnCounter += 1;
  }

  public sendTurn(): void {
    this.checkDisconnected();
    this.users.forEach((user) => {
      if (!user.socket) {
        return;
      }
      sendResponse(user.socket, MessageType.TURN, { currentPlayer: this.users[0].id });
    });
    this.nextTurn();
  }

  public handleAttack(attackData: AttackRequestData): void {
    throw new Error('Not implemented');
    console.log(this, attackData);
  }
}
