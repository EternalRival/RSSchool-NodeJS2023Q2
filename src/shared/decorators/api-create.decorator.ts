import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiDecoratorData } from '../interfaces/api-decorator.interface';

export function ApiCreate({ name, type, dto }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: `Add new ${name.toLowerCase()}`,
      description: `Add new ${name.toLowerCase()} information`,
    }),
    ApiBody({ type: dto }),
    ApiCreatedResponse({ description: `${name} is created`, type }),
    ApiBadRequestResponse({
      description: 'Bad request. body does not contain required fields',
    }),
  );
}
