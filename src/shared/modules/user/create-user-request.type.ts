import { Request } from 'express';
import { TRequestBody, TRequestParams } from '../../libs/rest/index.js';
import { CreateUserDto } from '../index.js';

export type TCreateUserRequest = Request<TRequestParams, TRequestBody, CreateUserDto>;
