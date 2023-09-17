import { ResponseMessage } from '../enums/response-message.enum';

export class UserNotFoundError extends Error {
  constructor() {
    super(ResponseMessage.USER_NOT_FOUND);
  }
}
