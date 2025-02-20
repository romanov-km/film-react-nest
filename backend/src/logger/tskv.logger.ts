import { Injectable, LoggerService } from '@nestjs/common';

/**
 * Логгер для машин, форматирует логи в формате TSKV (Tab-Separated Key-Value).
 */
@Injectable()
export class TskvLogger implements LoggerService {
  /**
   * Форматирует сообщение в TSKV.
   * @param level Уровень лога
   * @param message Сообщение
   * @param optionalParams Дополнительные параметры
   */
  private formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const params = optionalParams
      .map((param, index) => `param${index}=${param}`)
      .join('\t');
    return `level=${level}\tmessage=${message}\t${params}`;
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
