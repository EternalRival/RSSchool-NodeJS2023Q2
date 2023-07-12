import { InvalidDataError } from '../../errors/invalid-data.error';
import { isObject } from '../../helpers/is-object';
import { AddUserToRoomRequest, AddUserToRoomRequestData } from '../interfaces/room/add-user-to-room.request.interface';

function isValidAddUserToRoomData(rawData: unknown): rawData is AddUserToRoomRequest['data'] {
  return isObject(rawData) ? typeof rawData.indexRoom === 'number' : false;
}

export function validateAddUserToRoomData(message: unknown): AddUserToRoomRequestData {
  if (!isValidAddUserToRoomData(message)) {
    throw new InvalidDataError('addUserToRoom');
  }
  return message;
}
