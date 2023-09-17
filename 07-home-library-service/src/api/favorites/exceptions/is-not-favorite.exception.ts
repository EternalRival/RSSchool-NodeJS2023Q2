import { NotFoundException } from '@nestjs/common';

export class IsNotFavoriteException extends NotFoundException {
  constructor(name: Lowercase<string>) {
    super(`corresponding ${name} is not favorite`);
  }
}
