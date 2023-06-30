import { ResponseMessage } from '../enums/response-message.enum';

export class InvalidUuidError extends Error {
  constructor() {
    super(ResponseMessage.INVALID_UUID);
  }
}
