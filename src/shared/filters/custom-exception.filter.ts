import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpExceptionBody,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { getFormattedDate } from '../helpers/get-formatted-date';
import { isArray, isInt, isString } from 'class-validator';
import { HttpExceptionResponseBodyDto } from '../dto/http-exception-response-body.dto';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: Logger = new Logger('ExceptionFilter'),
  ) {}

  private isHttpExceptionBodyObject(body: object): body is HttpExceptionBody {
    return (
      (isString(body['message']) || isArray<string>(body['message'])) &&
      (!body['error'] || isString(body['error'])) &&
      isInt(body['statusCode'])
    );
  }

  public catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const responseBody: HttpExceptionResponseBodyDto = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Internal server error',
      timestamp: getFormattedDate(new Date()),
      path: ctx.getRequest().url,
    };

    if (exception instanceof HttpException) {
      responseBody.statusCode = exception.getStatus();
      const exceptionBody = exception.getResponse();

      if (isString(exceptionBody)) {
        responseBody.message = exceptionBody;
        responseBody.error = exception.message;
      } else if (this.isHttpExceptionBodyObject(exceptionBody)) {
        responseBody.message = exceptionBody.message;
        responseBody.error = exceptionBody.error || exception.message;
      }
    }

    if (Math.floor(responseBody.statusCode / 100) === 5) {
      this.logger.error(JSON.stringify(responseBody), exception?.['stack']);
    } else {
      this.logger.debug(JSON.stringify(responseBody));
    }

    ctx.getResponse().status(responseBody.statusCode).json(responseBody);
  }
}
