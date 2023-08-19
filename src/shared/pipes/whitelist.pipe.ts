import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export class WhiteListPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({ transform: true, whitelist: true, ...options });
  }
}
