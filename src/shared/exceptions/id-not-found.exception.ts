import { NotFoundException } from '@nestjs/common';

export class IdNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`record with \`id === ${id}\` doesn't exist`);
  }
}
