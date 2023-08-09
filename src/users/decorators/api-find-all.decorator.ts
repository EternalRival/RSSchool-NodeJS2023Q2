import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiDecoratorData } from '../../shared/interfaces/api-decorator.interface';

export function ApiFindAll({ name, type }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: `Get all ${name.toLowerCase()}s`,
      description: `Gets all ${name.toLowerCase()}s`,
    }),
    ApiOkResponse({
      description: 'Successful operation',
      type,
      isArray: true,
    }),
  );
}
