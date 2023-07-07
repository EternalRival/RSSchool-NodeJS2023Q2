import { RegRequest } from './interfaces/player/reg.request.interface';

function isValidRegData(rawData: unknown): rawData is RegRequest['data'] {
  if (rawData !== null && typeof rawData === 'object') {
    const obj = rawData as Record<string, unknown>;
    const { name, password } = obj;
    return typeof name === 'string' && typeof password === 'string';
  }
  return false;
}

export function validateRegData(message: unknown): RegRequest['data'] | null {
  return isValidRegData(message) ? message : null;
}
