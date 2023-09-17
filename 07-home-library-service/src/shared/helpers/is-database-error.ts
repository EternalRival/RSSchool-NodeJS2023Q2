import { DatabaseError } from 'pg-protocol';
import { QueryFailedError } from 'typeorm';

export function isDatabaseError(
  error: unknown,
): error is QueryFailedError & DatabaseError {
  return error instanceof QueryFailedError;
}
