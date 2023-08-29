import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { isString } from 'class-validator';
import { Observable, map } from 'rxjs';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  private logger: Logger = new Logger('ResponseLogger');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const { statusCode } = response;

    response.type('application/json');

    return next.handle().pipe(
      map((responseMessage) => {
        const message = isString(responseMessage)
          ? { message: responseMessage }
          : responseMessage;
        this.logger.debug(JSON.stringify({ statusCode, ...message }));
        return message;
      }),
    );
  }
}
