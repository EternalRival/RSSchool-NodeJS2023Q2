import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiDecoratorData } from '../interfaces/api-decorator.interface';

export function ApiFindAll({ name, responseType }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: `Get ${name.toLowerCase()}s list`,
      description: `Gets all ${name.toLowerCase()}s list`,
    }),
    ApiOkResponse({
      description: 'Successful operation',
      type: responseType,
      isArray: true,
    }),
  );
}
