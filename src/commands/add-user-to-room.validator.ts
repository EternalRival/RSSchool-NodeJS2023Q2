import { AddUserToRoomRequest } from './interfaces/room/add-user-to-room.request.interface';

function isValidAddUserToRoomData(rawData: unknown): rawData is AddUserToRoomRequest['data'] {
  if (rawData !== null && typeof rawData === 'object') {
    const obj = rawData as Record<string, unknown>;
    const { indexRoom } = obj;
    return typeof indexRoom === 'number';
  }
  return false;
}

export function validateAddUserToRoomData(message: unknown): AddUserToRoomRequest['data'] | null {
  return isValidAddUserToRoomData(message) ? message : null;
}
