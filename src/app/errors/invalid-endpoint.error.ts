import { ResponseMessage } from '../enums/response-message.enum';

export class InvalidEndpointError extends Error {
  constructor() {
    super(ResponseMessage.INVALID_ENDPOINT);
  }
}
