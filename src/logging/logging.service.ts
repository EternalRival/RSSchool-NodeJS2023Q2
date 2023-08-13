import { Injectable, LogLevel, LoggerService, Optional } from '@nestjs/common';
import { colorize } from '../shared/helpers/colorize';
import { DateFormatter } from '../shared/helpers/date-formatter';

/** default logs example
api  | `#green`[Nest] 257  - `#white`08/12/2023, 2:05:28 AM     `#green`LOG `#yellow`[NestFactory] `#green`Starting Nest application...
api  | `#green`[Nest] 257  - `#white`08/12/2023, 2:05:28 AM     `#green`LOG `#yellow`[InstanceLoader] `#green`TypeOrmModule dependencies initialized `#yellow`+1ms
*/

enum LogLevelColor {
  log = 'green',
  warn = 'yellow',
  error = 'red',
  verbose = 'cyan',
  debug = 'magenta',
}

@Injectable()
export class LoggingService implements LoggerService {
  public readonly defaultLogLevels = [
    'error',
    'warn',
    'log',
    'verbose',
    'debug',
  ] as const;

  private levels: LogLevel[] = [...this.defaultLogLevels];

  constructor(
    @Optional() protected scope: string,
    @Optional() protected options?: { timestamp?: boolean },
  ) {}

  private printMessage(level: LogLevel, message: string, scope?: string) {
    if (!this.levels.includes(level)) {
      return;
    }

    const color = LogLevelColor[level];
    const date = DateFormatter.format(Date.now());

    const processMessage = colorize(`[Nest] ${process.pid} -`, color);
    const timestamp = colorize(date, 'white');
    const logLevel = colorize(`[${level.toUpperCase()}]`, color);
    const logScope = scope ? colorize(`[${scope}]`, 'yellow') : '';
    const logMessage = colorize(message, color);

    const result = [processMessage, timestamp, logLevel, logScope, logMessage]
      .filter(Boolean)
      .join('\xa0');

    console.log(result);
  }

  private printStackMessage(stack?: string | null) {
    stack && console.log(stack);
  }

  public log(message: any, scope?: string) {
    this.printMessage('log', message, scope);
  }
  public error(message: any, stack?: string | null, scope?: string) {
    this.printMessage('error', message, scope);
    this.printStackMessage(stack);
  }
  public warn(message: any, scope?: string) {
    this.printMessage('warn', message, scope);
  }
  public debug(message: any, scope?: string) {
    this.printMessage('debug', message, scope);
  }
  public verbose(message: any, scope?: string) {
    this.printMessage('verbose', message, scope);
  }

  public setLogLevels(levels: LogLevel[]) {
    this.levels = levels;
  }

  public setLogLevelsByNumber(level: number) {
    if (level >= 0 && level <= 5) {
      this.setLogLevels(this.defaultLogLevels.slice(0, level));
    }
  }
}
