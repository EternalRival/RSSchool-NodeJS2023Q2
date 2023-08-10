import { UnprocessableEntityException } from '@nestjs/common';

export class EntityNotExistException extends UnprocessableEntityException {
  constructor(id: string, name: Lowercase<string>) {
    super(`${name} with \`id === ${id}\` doesn't exist`);
  }
}
