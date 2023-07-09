import { isObject } from '../../helpers/is-object';
import { AddUserToRoomRequest } from '../interfaces/room/add-user-to-room.request.interface';

function isValidAddUserToRoomData(rawData: unknown): rawData is AddUserToRoomRequest['data'] {
  return isObject(rawData) ? typeof rawData.indexRoom === 'number' : false;
}

export function validateAddUserToRoomData(message: unknown): AddUserToRoomRequest['data'] | null {
  return isValidAddUserToRoomData(message) ? message : null;
}
