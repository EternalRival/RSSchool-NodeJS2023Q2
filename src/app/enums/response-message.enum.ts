export enum ResponseMessage {
  INTERNAL_SERVER_ERROR = 'internal server error',
  INVALID_USER_DATA = 'request body does not contain required fields with proper types',
  USER_DOESNT_EXIST = 'user doesn.t exist',
  INVALID_UUID = 'invalid id',
  WRONG_URL = 'wrong url',
}
