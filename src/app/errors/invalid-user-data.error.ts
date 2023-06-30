import { ResponseMessage } from '../enums/response-message.enum';

export class InvalidUserDataError extends Error {
  constructor() {
    super(ResponseMessage.INVALID_USER_DATA);
  }
}
