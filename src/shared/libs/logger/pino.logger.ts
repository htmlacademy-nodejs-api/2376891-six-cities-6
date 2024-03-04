import { Logger as PinoInstance, pino, transport } from 'pino';
import { injectable } from 'inversify';
import path from 'node:path';
import { ILogger } from './logger.interface.js';
import { LOG_FILE_PATH } from '../../../utils/const.js';

@injectable()
export class PinoLogger implements ILogger {
  private readonly logger: PinoInstance;

  constructor() {
    const destination = path.join(path.resolve(), LOG_FILE_PATH);

    this.logger = pino({}, transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug'
        },
        {
          target: 'pino/file',
          options: { },
          level: 'info'
        }
      ],
    }));
    this.logger.info('Logger created...');
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
