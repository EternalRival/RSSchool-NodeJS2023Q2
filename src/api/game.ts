import { WebSocket } from 'ws';
import { Ship } from '../commands/interfaces/shared/ship.interface';
import { User } from './user';
import { sendResponse } from '../commands/send-response';
import { MessageType } from '../socket-message/enums/message-type.enum';
import { AttackRequestData } from '../commands/interfaces/game/attack.request.interface';
import { PlayerDisconnectedError } from '../errors/player-disconnected.error';
import { NotImplementedError } from '../errors/not-implemented.error';

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
      throw new PlayerDisconnectedError();
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
    throw new NotImplementedError('handleAttack');
    console.log(this, attackData);
  }
}
