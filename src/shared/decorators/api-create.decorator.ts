import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiDecoratorData } from '../interfaces/api-decorator.interface';

export function ApiCreate({ name, responseType, bodyType }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: `Create ${name.toLowerCase()}`,
      description: `Creates a new ${name.toLowerCase()}`,
    }),
    ApiBody({ type: bodyType }),
    ApiCreatedResponse({
      description: `The ${name.toLowerCase()} has been created`,
      type: responseType,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. body does not contain required fields',
    }),
  );
}
