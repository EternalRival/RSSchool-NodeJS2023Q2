import { Injectable, LogLevel, LoggerService } from '@nestjs/common';

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
