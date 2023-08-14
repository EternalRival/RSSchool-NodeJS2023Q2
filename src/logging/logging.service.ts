import { Injectable, LogLevel, LoggerService, Optional } from '@nestjs/common';
import { colorize } from '../shared/helpers/colorize';
import { DateFormatter } from '../shared/helpers/date-formatter';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { EOL } from 'os';

enum LogLevelColor {
  log = 'green',
  warn = 'yellow',
  error = 'red',
  verbose = 'cyan',
  debug = 'magenta',
}

interface LogData {
  level: LogLevel;
  message: string;
  scope?: string;
  stack?: string | null;
}

interface LogMessage {
  processMessage: string;
  timestamp: string;
  level: string;
  scope?: string;
  message: string;
  stack?: string | null;
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

  // TODO пути
  private logWriteStream = createWriteStream(
    resolve(__dirname, `${Date.now()}-logs.txt`),
  );
  private errorWriteStream = createWriteStream(
    resolve(__dirname, `${Date.now()}-errors.txt`),
  );

  constructor(
    @Optional() protected scope: string,
    @Optional() protected options?: { timestamp?: boolean },
  ) {}

  private isEnabledLevel(level: LogLevel): boolean {
    return this.levels.includes(level);
  }

  private buildMessage({ level, message, scope, stack }: LogData): LogMessage {
    return {
      processMessage: `[Nest] ${process.pid} -`,
      timestamp: DateFormatter.format(Date.now()),
      level: `[${level.toUpperCase()}]`,
      scope: scope ? `[${scope}]` : '',
      message,
      stack: stack ? `${stack}${EOL}` : '',
    };
  }

  private colorizeMessage(
    logMessage: LogMessage,
    color: LogLevelColor,
  ): LogMessage {
    return {
      processMessage: colorize(logMessage.processMessage, color),
      timestamp: colorize(logMessage.timestamp, 'white'),
      level: colorize(logMessage.level, color),
      scope: logMessage.scope ? colorize(logMessage.scope, 'yellow') : '',
      message: colorize(logMessage.message, color),
      stack: colorize(logMessage.stack ?? '', 'gray'),
    };
  }

  private buildLogString(logMessage: LogMessage) {
    const { processMessage, timestamp, level, scope, message } = logMessage;
    const logString = [processMessage, timestamp, level, scope, message]
      .filter(Boolean)
      .join('\xa0');
    return `${logString}${EOL}${logMessage.stack}`;
  }

  private writeLogToFile(logMessage: LogMessage, options = { isError: false }) {
    const logString = this.buildLogString(logMessage);
    this.logWriteStream.write(logString);
    if (options.isError) {
      this.errorWriteStream.write(logString);
    }
  }

  private writeLogToStdout(logMessage: LogMessage, color: LogLevelColor) {
    const logMessageColored = this.colorizeMessage(logMessage, color);
    const logStringColored = this.buildLogString(logMessageColored);
    process.stdout.write(logStringColored);
  }

  private handleIncomingLog(logData: LogData) {
    if (this.isEnabledLevel(logData.level)) {
      const logMessage = this.buildMessage(logData);
      this.writeLogToFile(logMessage, { isError: logData.level === 'error' });
      this.writeLogToStdout(logMessage, LogLevelColor[logData.level]);
    }
  }

  public log(message: any, scope?: string) {
    this.handleIncomingLog({ level: 'log', message, scope });
  }
  public error(message: any, stack?: string | null, scope?: string) {
    this.handleIncomingLog({ level: 'error', message, scope, stack });
  }
  public warn(message: any, scope?: string) {
    this.handleIncomingLog({ level: 'warn', message, scope });
  }
  public debug(message: any, scope?: string) {
    this.handleIncomingLog({ level: 'debug', message, scope });
  }
  public verbose(message: any, scope?: string) {
    this.handleIncomingLog({ level: 'verbose', message, scope });
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
