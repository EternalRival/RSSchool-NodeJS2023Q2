export enum ResponseMessage {
  INTERNAL_SERVER_ERROR = 'internal server error',
  INVALID_UUID = 'invalid id',
  INVALID_USER_DATA = 'request body does not contain required fields with proper types',
  USER_NOT_FOUND = "user doesn't exist",
  INVALID_ENDPOINT = 'wrong url',
}
