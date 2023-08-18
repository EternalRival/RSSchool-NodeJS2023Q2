import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { getFormattedDate } from '../helpers/get-formatted-date';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: Logger = new Logger('ExceptionFilter'),
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const responseBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      timestamp: getFormattedDate(new Date()),
      path: ctx.getRequest().url,
    };

    if (exception instanceof HttpException) {
      responseBody.statusCode = exception.getStatus();
      responseBody.message = exception.message;
    }

    ctx.getResponse().status(responseBody.statusCode).json(responseBody);
  }
}
