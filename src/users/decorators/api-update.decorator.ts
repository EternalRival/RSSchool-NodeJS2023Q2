import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ApiDecoratorData } from '../../shared/interfaces/api-decorator.interface';

export function ApiUpdate({ name, dto }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: `Update a ${name.toLowerCase()}'s password`,
      description: `Updates a ${name.toLowerCase()}'s password by ID`,
    }),
    ApiParam({ name: 'id', format: 'uuid' }),
    ApiBody({ type: dto }),
    ApiOkResponse({
      description: `The ${name.toLowerCase()} has been updated`,
      schema: {
        title: name,
        properties: {
          id: { type: 'string', format: 'uuid' },
          login: { type: 'string', example: `Test${name.toLowerCase()}` },
          version: { type: 'integer', example: 2 },
          createdAt: { type: 'integer', example: 1655000000 },
          updatedAt: { type: 'integer', example: 1655999999 },
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Bad request. id is invalid (not uuid)',
    }),
    ApiForbiddenResponse({ description: 'oldPassword is wrong' }),
    ApiNotFoundResponse({ description: `${name} not found` }),
  );
}
