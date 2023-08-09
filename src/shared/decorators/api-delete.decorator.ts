import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ApiDecoratorData } from '../interfaces/api-decorator.interface';

export function ApiDelete({ name }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: `Delete ${name.toLowerCase()}`,
      description: `Deletes ${name.toLowerCase()} from library`,
    }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiNoContentResponse({ description: 'Deleted successfully' }),
    ApiBadRequestResponse({
      description: 'Bad request. id is invalid (not uuid)',
    }),
    ApiNotFoundResponse({ description: `${name} was not found` }),
  );
}
