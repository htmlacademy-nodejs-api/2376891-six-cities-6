import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter } from './exception-filter.interface.js';
import { EComponent } from '../../../types/index.js';
import { ILogger } from '../../logger/index.js';
import { EApplicationError } from '../index.js';
import { createErrorObject } from '../../../helpers/index.js';

@injectable()
export class AppExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(EComponent.Logger) private readonly logger: ILogger
  ) {
    this.logger.info('Register AppExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(EApplicationError.ServiceError, error.message));
  }
}
