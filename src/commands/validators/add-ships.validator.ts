import { isObject } from '../../helpers/is-object';
import { AddShipsRequestData } from '../interfaces/ships/add-ships.request.interface';
import { Ship } from '../interfaces/shared/ship.interface';
import { Position } from '../interfaces/shared/position.interface';

function isShipPosition(rawData: unknown): rawData is Position {
  if (isObject(rawData)) {
    return typeof rawData.x === 'number' && typeof rawData.y === 'number';
  }
  return false;
}

function isShip(rawData: unknown): rawData is Ship {
  if (isObject(rawData)) {
    const { position, direction, length, type } = rawData;
    return (
      isShipPosition(position) &&
      typeof direction === 'boolean' &&
      typeof length === 'number' &&
      typeof type === 'string' &&
      ['small', 'medium', 'large', 'huge'].includes(type)
    );
  }
  return false;
}

function isValidAddShipsData(rawData: unknown): rawData is AddShipsRequestData {
  if (isObject(rawData)) {
    const { gameId, ships, indexPlayer } = rawData;
    return typeof gameId === 'number' && Array.isArray(ships) && ships.every(isShip) && typeof indexPlayer === 'number';
  }
  return false;
}

export function validateAddShipsData(message: unknown): AddShipsRequestData {
  if (!isValidAddShipsData(message)) {
    throw new Error('Invalid addShips data');
  }
  return message;
}
