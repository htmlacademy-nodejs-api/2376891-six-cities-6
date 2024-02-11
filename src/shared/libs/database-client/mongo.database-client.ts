import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';
import { DatabaseClient } from './database-client.interface.js';
import { EComponent } from '../../types/index.js';
import { Logger } from '../logger/index.js';
import { ERetry } from '../../../utils/const.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose!: typeof Mongoose;

  constructor(
    @inject(EComponent.Logger) private readonly logger: Logger
  ) {}

  get isConnectedToDatabase(): boolean {
    return this.mongoose?.connection.readyState === 1;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB...');

    let attempt = 0;
    while (attempt < ERetry.Count) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(ERetry.Timeout);
      }
    }

    throw new Error(`Unable to establish database connection after ${ERetry.Count}`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase || !this.mongoose) {
      throw new Error('Not connected to the database.');
    }

    try {
      await this.mongoose.disconnect();
      this.logger.info('Database connection closed.');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('The database connection could not be closed', error);
      }
      throw new Error('The database connection could not be closed');
    }

  }
}
