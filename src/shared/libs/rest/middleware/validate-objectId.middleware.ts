import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from './middleware.interface.js';
import { Types } from 'mongoose';
import { HttpError } from '../index.js';
import { StatusCodes } from 'http-status-codes';

export class ValidateObjectIdMiddleware implements IMiddleware {
  constructor(private param: string) {}

  public execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectId`,
      'ValidateObjectIdMiddleware'
    );
  }
}
