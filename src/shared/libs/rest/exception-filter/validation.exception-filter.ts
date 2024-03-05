import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IExceptionFilter } from './exception-filter.interface.js';
import { EComponent } from '../../../types/index.js';
import { ILogger } from '../../logger/index.js';
import { EApplicationError, ValidationError } from '../index.js';
import { createErrorObject } from '../../../helpers/common.js';

@injectable()
export class ValidationExceptionFilter implements IExceptionFilter {
  constructor(
    @inject(EComponent.Logger) private readonly logger: ILogger
  ) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error.message}`, error);

    error.details.forEach(
      (errorField) => this.logger.warn(`[${errorField.property}] — ${errorField.messages}`)
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(EApplicationError.ValidationError, error.message, error.details));
  }
}
