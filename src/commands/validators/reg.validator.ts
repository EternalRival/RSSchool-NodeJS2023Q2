import { isObject } from '../../helpers/is-object';
import { RegRequest } from '../interfaces/player/reg.request.interface';

function isValidRegData(rawData: unknown): rawData is RegRequest['data'] {
  return isObject(rawData) ? typeof rawData.name === 'string' && typeof rawData.password === 'string' : false;
}

export function validateRegData(message: unknown): RegRequest['data'] | null {
  return isValidRegData(message) ? message : null;
}
