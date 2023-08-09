import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiDecoratorData } from '../interfaces/api-decorator.interface';

export function ApiFindAll({ name, type }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: `Get ${name.toLowerCase()}s list`,
      description: `Gets all library ${name.toLowerCase()}s list`,
    }),
    ApiOkResponse({
      description: 'Successful operation',
      type,
      isArray: true,
    }),
  );
}
