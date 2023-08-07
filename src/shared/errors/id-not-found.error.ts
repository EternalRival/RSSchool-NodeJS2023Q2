import { HttpException, HttpStatus } from '@nestjs/common';

export class IdNotFoundError extends HttpException {
  constructor(id: string) {
    super(`record with \`id === ${id}\` doesn't exist`, HttpStatus.NOT_FOUND);
  }
}
