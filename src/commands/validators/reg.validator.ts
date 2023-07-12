import { InvalidDataError } from '../../errors/invalid-data.error';
import { isObject } from '../../helpers/is-object';
import { RegRequestData } from '../interfaces/player/reg.request.interface';

function isValidRegData(rawData: unknown): rawData is RegRequestData {
  return isObject(rawData) ? typeof rawData.name === 'string' && typeof rawData.password === 'string' : false;
}

export function validateRegData(message: unknown): RegRequestData {
  if (!isValidRegData(message)) {
    throw new InvalidDataError('reg');
  }
  return message;
}
