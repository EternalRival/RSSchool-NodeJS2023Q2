import { UnprocessableEntityException } from '@nestjs/common';

function buildExceptionMessage(detail: string) {
  const table = detail.match(/in table "(.+)"/)?.[1];
  const uuid = detail.match(/Id\)=\((.+)\)/)?.[1];
  return `${table} with \`id === ${uuid}\` doesn't exist`;
}

export class EntityNotExistException extends UnprocessableEntityException {
  constructor(detail: string) {
    super(buildExceptionMessage(detail));
  }
}
