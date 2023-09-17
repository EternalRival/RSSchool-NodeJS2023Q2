import { ParseUUIDPipe, ParseUUIDPipeOptions } from '@nestjs/common';

export class ParseUUIDV4Pipe extends ParseUUIDPipe {
  constructor(options?: Omit<ParseUUIDPipeOptions, 'version'>) {
    super({ ...options, version: '4' });
  }
}
