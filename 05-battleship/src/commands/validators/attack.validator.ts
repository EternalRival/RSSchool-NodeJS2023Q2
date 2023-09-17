import { InvalidDataError } from '../../errors/invalid-data.error';
import { isObject } from '../../helpers/is-object';
import { AttackRequestData } from '../interfaces/game/attack.request.interface';

function isValidAddShipsData(rawData: unknown): rawData is AttackRequestData {
  if (isObject(rawData)) {
    const { gameId, x, y, indexPlayer } = rawData;
    return [gameId, x, y, indexPlayer].every((prop) => typeof prop === 'number');
  }
  return false;
}

export function validateAttackData(message: unknown): AttackRequestData {
  if (!isValidAddShipsData(message)) {
    throw new InvalidDataError('attack');
  }
  return message;
}
