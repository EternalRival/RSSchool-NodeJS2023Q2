import { Type } from '@nestjs/common';

export interface ApiDecoratorData {
  name: Capitalize<string>;
  bodyType?: Type<unknown>;
  responseType?: Type<unknown>;
}
