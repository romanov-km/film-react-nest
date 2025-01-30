import { Injectable, ConsoleLogger } from '@nestjs/common';

/**
 * Логгер для разработчиков, использует стандартный ConsoleLogger.
 */
@Injectable()
export class DevLogger extends ConsoleLogger {}
