import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IExceptionFilter } from './exception-filter.interface.js';
import { EComponent } from '../../../types/index.js';
import { ILogger } from '../../logger/index.js';
import { EApplicationError, HttpError } from '../index.js';
import { createErrorObject } from '../../../helpers/common.js';

@injectable()
export class HttpErrorExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(EComponent.Logger) private readonly logger: ILogger
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`, error);

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(EApplicationError.CommonError, error.message));
  }
}
