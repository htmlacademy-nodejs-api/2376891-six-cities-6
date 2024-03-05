import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMiddleware } from './middleware.interface.js';
import { HttpError } from '../index.js';

export class PrivateRouteMiddleware implements IMiddleware {
  public async execute({tokenPayload}: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!tokenPayload) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
