import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger = new Logger('ResponseLogger')) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { statusCode } = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap((message) => {
        return this.logger.debug(JSON.stringify({ statusCode, message }));
      }),
    );
  }
}
