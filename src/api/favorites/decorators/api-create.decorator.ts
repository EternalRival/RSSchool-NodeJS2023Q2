import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ApiDecoratorData } from '../../../shared/interfaces/api-decorator.interface';

export function ApiCreate({ name }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: `Add ${name.toLowerCase()} to the favorites`,
      description: `Add ${name.toLowerCase()} to the favorites`,
    }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiCreatedResponse({
      description: 'Added successfully',
      schema: {
        properties: {
          message: {
            type: 'string',
            example: `the ${name.toLowerCase()} 3fa85f64-5717-4562-b3fc-2c963f66afa6 was added to favorites`,
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad request. id is invalid (not uuid)',
    }),
    ApiUnprocessableEntityResponse({
      description: `${name} with id doesn't exist`,
    }),
  );
}
