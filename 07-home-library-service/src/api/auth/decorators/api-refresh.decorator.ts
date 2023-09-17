import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiDecoratorData } from '../../../shared/interfaces/api-decorator.interface';

export function ApiRefresh({ name, responseType, bodyType }: ApiDecoratorData) {
  return applyDecorators(
    ApiOperation({
      summary: `Refresh ${name} tokens`,
      description: `Refresh ${name} tokens`,
    }),
    ApiBody({ type: bodyType }),
    ApiOkResponse({
      description: 'tokens refreshed',
      type: responseType,
    }),
    ApiUnauthorizedResponse({ description: 'dto is invalid' }),
    ApiForbiddenResponse({ description: 'authentication failed' }),
  );
}
