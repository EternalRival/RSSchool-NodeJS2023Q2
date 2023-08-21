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
      summary: `Create ${name.toLowerCase()}`,
      description: `Creates a new ${name.toLowerCase()}`,
    }),
    ApiBody({ type: dto }),
    ApiCreatedResponse({
      description: `The ${name.toLowerCase()} has been created`,
      type,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. body does not contain required fields',
    }),
  );
}
