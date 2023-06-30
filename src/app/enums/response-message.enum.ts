export enum ResponseMessage {
  INTERNAL_SERVER_ERROR = 'INTERNAL SERVER ERROR',
  INVALID_UUID = 'Invalid ID. Provide the correct UUID',
  INVALID_USER_DATA = 'Request body does not contain required fields. Provide object with proper types: { username: string, age: number, hobbies: string[] }',
  USER_NOT_FOUND = "User doesn't exist",
  INVALID_ENDPOINT = 'Invalid endpoint/url',
}
