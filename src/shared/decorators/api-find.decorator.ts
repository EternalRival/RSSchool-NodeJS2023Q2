import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ApiDecoratorData } from '../interfaces/api-decorator.interface';

export function ApiFind({ name, type }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: `Get single ${name.toLowerCase()} by id`,
      description: `Get single ${name.toLowerCase()} by id`,
    }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiOkResponse({ description: 'Successful operation', type }),
    ApiBadRequestResponse({
      description: 'Bad request. id is invalid (not uuid)',
    }),
    ApiNotFoundResponse({ description: `${name} was not found` }),
  );
}
