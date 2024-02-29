import { Request, Response, NextFunction } from 'express';
import { TTokenPayload } from '../../../modules/auth/index.js';
import { EUserAccountType } from '../../../types/user.type.js';
import { Middleware } from './middleware.interface.js';
import { jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';
import { HttpError } from '../index.js';
import { StatusCodes } from 'http-status-codes';

function isTokenPayload(payload: unknown): payload is TTokenPayload {
  return (
    (typeof payload === 'object' && payload !== null) &&
    ('id' in payload && typeof payload.id === 'string') &&
    ('name' in payload && typeof payload.name === 'string') &&
    ('email' in payload && typeof payload.email === 'string') &&
    ('avatarUrl' in payload && typeof payload.avatarUrl === 'string') &&
    ('accountType' in payload && typeof payload.accountType === typeof EUserAccountType)
  );
}

export class ParseTokenMiddleware implements Middleware {
  constructor(private readonly jwtSecret: string) { }

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers?.authorization?.split(' ');
    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));

      if (isTokenPayload(payload)) {
        req.tokenPayload = { ...payload };
        return next();
      } else {
        throw new Error('Bad token');
      }
    } catch {
      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Invalid token',
        'AuthenticateMiddleware'
      ));
    }
  }
}
