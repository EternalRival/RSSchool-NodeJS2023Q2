import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ApiDecoratorData } from '../interfaces/api-decorator.interface';

export function ApiUpdate({ name, responseType, bodyType }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: `Update ${name.toLowerCase()} information`,
      description: `Update library ${name.toLowerCase()} information by UUID`,
    }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiBody({ type: bodyType }),
    ApiOkResponse({
      description: `The ${name.toLowerCase()} has been updated`,
      type: responseType,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. id is invalid (not uuid)',
    }),
    ApiNotFoundResponse({ description: `${name} not found` }),
  );
}
