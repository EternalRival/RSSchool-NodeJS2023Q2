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
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger = new Logger('ResponseLogger')) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { statusCode } = context.switchToHttp().getResponse();

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
