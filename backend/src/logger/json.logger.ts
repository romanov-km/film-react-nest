import { Injectable, LoggerService } from '@nestjs/common';

/**
 * Логгер для машин, форматирует логи в JSON.
 */
@Injectable()
export class JsonLogger implements LoggerService {
  /**
   * Форматирует сообщение в JSON.
   * @param level Уровень лога (log, error, warn, debug, verbose)
   * @param message Сообщение
   * @param optionalParams Дополнительные параметры
   */
  private formatMessage(level: string, message: any, ...optionalParams: any[]) {
    return JSON.stringify({ level, message, optionalParams });
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }
}
