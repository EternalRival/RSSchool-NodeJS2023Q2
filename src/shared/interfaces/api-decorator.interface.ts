import { Type } from '@nestjs/common';

export interface ApiDecoratorData {
  name: Capitalize<string>;
  type?: Type<unknown>;
  dto?: Type<unknown>;
}
