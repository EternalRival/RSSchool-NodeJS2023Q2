import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiDecoratorData } from '../../../shared/interfaces/api-decorator.interface';

export function ApiFindAll({ name, responseType }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: `Get all ${name.toLowerCase()}s`,
      description: `Gets all ${name.toLowerCase()}s movies, tracks and books`,
    }),
    ApiOkResponse({
      description: 'Successful operation',
      type: responseType,
      isArray: true,
    }),
  );
}
