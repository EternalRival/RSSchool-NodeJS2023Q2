import { Injectable, LogLevel, LoggerService } from '@nestjs/common';

/** default logs example
api  | `#green`[Nest] 257  - `#white`08/12/2023, 2:05:28 AM     `#green`LOG `#yellow`[NestFactory] `#green`Starting Nest application...
api  | `#green`[Nest] 257  - `#white`08/12/2023, 2:05:28 AM     `#green`LOG `#yellow`[InstanceLoader] `#green`TypeOrmModule dependencies initialized `#yellow`+1ms
*/

@Injectable()
export class LoggingService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log('\x1b[35m' + message);
    return;
    throw new Error('Method not implemented.');
    console.log(message, optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    console.log('\x1b[35m' + message);
    return;
    throw new Error('Method not implemented.');
    console.log(message, optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    console.log('\x1b[35m' + message);
    return;
    throw new Error('Method not implemented.');
    console.log(message, optionalParams);
  }
  debug?(message: any, ...optionalParams: any[]) {
    console.log('\x1b[35m' + message);
    return;
    throw new Error('Method not implemented.');
    console.log(message, optionalParams);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    console.log('\x1b[35m' + message);
    return;
    throw new Error('Method not implemented.');
    console.log(message, optionalParams);
  }
  setLogLevels?(levels: LogLevel[]) {
    console.log('\x1b[35m' + levels);
    return;
    throw new Error('Method not implemented.');
    console.log(levels);
  }
}
