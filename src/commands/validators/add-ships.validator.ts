import { isObject } from '../../helpers/is-object';
import { AddShipsRequest } from '../interfaces/ships/add-ships.request.interface';

function isPosition(rawData: unknown): rawData is AddShipsRequest['data']['ships'][0]['position'] {
  if (isObject(rawData)) {
    return typeof rawData.x === 'number' && typeof rawData.y === 'number';
  }
  return false;
}

function isShip(rawData: unknown): rawData is AddShipsRequest['data']['ships'][0] {
  if (isObject(rawData)) {
    const { position, direction, length, type } = rawData;
    return (
      isPosition(position) &&
      typeof direction === 'boolean' &&
      typeof length === 'number' &&
      typeof type === 'string' &&
      ['small', 'medium', 'large', 'huge'].includes(type)
    );
  }
  return false;
}

function isValidAddShipsData(rawData: unknown): rawData is AddShipsRequest['data'] {
  if (isObject(rawData)) {
    const { gameId, ships, indexPlayer } = rawData;
    return typeof gameId === 'number' && Array.isArray(ships) && ships.every(isShip) && typeof indexPlayer === 'number';
  }
  return false;
}

export function validateAddShipsData(message: unknown): AddShipsRequest['data'] | null {
  return isValidAddShipsData(message) ? message : null;
}
