import { Injectable, LogLevel, LoggerService, Optional } from '@nestjs/common';
import { colorize } from '../shared/helpers/colorize';
import { WriteStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { EOL } from 'os';
import { getFormattedDate } from '../shared/helpers/get-formatted-date';
import { ConfigService } from '@nestjs/config';
import { toNumber } from '../shared/helpers/to-number';

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
  private defaultMaxFileSize = 10240;
  public readonly defaultLogLevels = [
    'error',
    'warn',
    'log',
    'verbose',
    'debug',
  ] as const;

  private levels: LogLevel[] = [...this.defaultLogLevels];

  private saveLogs: boolean;
  private maxFileSize: number;
  private logWriteStream?: WriteStream;
  private errorWriteStream?: WriteStream;

  constructor(
    configService: ConfigService,
    @Optional() protected scope: string,
    @Optional() protected options?: { timestamp?: boolean },
  ) {
    this.maxFileSize =
      toNumber(configService.get('MAX_FILE_SIZE')) ?? this.defaultMaxFileSize;

    this.saveLogs = !!(toNumber(configService.get('ENABLE_LOGS_FILES')) ?? 1);

    if (this.saveLogs) {
      this.logWriteStream = this.createLogWriteStream('logs');
      this.errorWriteStream = this.createLogWriteStream('errors');
    }
  }

  private isNeedToBeRotated(stream: WriteStream, nextMessage: string): boolean {
    const nextFileSize = stream.bytesWritten + Buffer.byteLength(nextMessage);
    return nextFileSize >= this.maxFileSize;
  }

  private createLogWriteStream(postfix: 'logs' | 'errors'): WriteStream {
    const date = getFormattedDate(new Date(), { uncluttered: true });
    const logFilePath = resolve('logs', `${date}-${postfix}.txt`);
    return createWriteStream(logFilePath);
  }

  private isEnabledLevel(level: LogLevel): boolean {
    return this.levels.includes(level);
  }

  private buildMessage({ level, message, scope, stack }: LogData): LogMessage {
    return {
      processMessage: `[Nest-HLS] ${process.pid} -`,
      timestamp: getFormattedDate(new Date()),
      level: `[${level.toUpperCase()}]`,
      scope: scope ? `[${scope}]` : '',
      message,
      stack: stack ? `${EOL}${stack}` : '',
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
      stack: logMessage.stack,
    };
  }

  private buildLogString(logMessage: LogMessage): string {
    const { processMessage, timestamp, level, scope, message } = logMessage;
    const logString = [processMessage, timestamp, level, scope, message]
      .filter(Boolean)
      .join('\xa0');
    return `${logString}${logMessage.stack}`;
  }

  private writeLogToFile(
    logMessage: LogMessage,
    options = { isError: false },
  ): void {
    const logString = `${this.buildLogString(logMessage)}${EOL}`;

    if (this.logWriteStream) {
      if (this.isNeedToBeRotated(this.logWriteStream, logString)) {
        this.logWriteStream.close();
        this.logWriteStream = this.createLogWriteStream('logs');
      }
      this.logWriteStream.write(logString);
    }

    if (options.isError && this.errorWriteStream) {
      if (this.isNeedToBeRotated(this.errorWriteStream, logString)) {
        this.errorWriteStream.close();
        this.errorWriteStream = this.createLogWriteStream('errors');
      }
      this.errorWriteStream.write(logString);
    }
  }

  private writeLogToStdout(logMessage: LogMessage, level: LogLevel): void {
    const color = LogLevelColor[level];
    const logMessageColored = this.colorizeMessage(logMessage, color);
    const logStringColored = this.buildLogString(logMessageColored);

    console[level === 'verbose' ? 'debug' : level](logStringColored);
  }

  private handleIncomingLog(logData: LogData): void {
    if (this.isEnabledLevel(logData.level)) {
      const logMessage = this.buildMessage(logData);
      if (this.saveLogs) {
        this.writeLogToFile(logMessage, { isError: logData.level === 'error' });
      }
      this.writeLogToStdout(logMessage, logData.level);
    }
  }

  public log(message: any, scope?: string): void {
    this.handleIncomingLog({ level: 'log', message, scope });
  }
  public error(message: any, stack?: string | null, scope?: string): void {
    this.handleIncomingLog({ level: 'error', message, scope, stack });
  }
  public warn(message: any, scope?: string): void {
    this.handleIncomingLog({ level: 'warn', message, scope });
  }
  public debug(message: any, scope?: string): void {
    this.handleIncomingLog({ level: 'debug', message, scope });
  }
  public verbose(message: any, scope?: string): void {
    this.handleIncomingLog({ level: 'verbose', message, scope });
  }

  public setLogLevels(levels: LogLevel[]): void {
    this.levels = levels;
  }

  public setLogLevelsByNumber(level: number): void {
    if (level >= 0 && level <= 5) {
      this.setLogLevels(this.defaultLogLevels.slice(0, level));
    }
  }
}
