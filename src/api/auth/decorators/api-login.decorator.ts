import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiDecoratorData } from '../../../shared/interfaces/api-decorator.interface';

export function ApiLogin({ responseType, bodyType }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: 'Authenticate with login and password and get JWT tokens',
      description: 'Authenticate with login and password and get JWT tokens',
    }),
    ApiBody({ type: bodyType }),
    ApiOkResponse({ description: 'authenticated', type: responseType }),
    ApiBadRequestResponse({ description: 'dto is invalid' }),
    ApiForbiddenResponse({ description: 'authentication failed' }),
  );
}
