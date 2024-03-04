import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IMiddleware } from './middleware.interface.js';
import { HttpError } from '../index.js';

export class AnonymRouteMiddleware implements IMiddleware {
  public async execute({tokenPayload}: Request, _res: Response, next: NextFunction): Promise<void> {
    if (tokenPayload) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Authorized. Only anonymous users can create new users.',
        'AnonymRouteMiddleware'
      );
    }

    return next();
  }
}

