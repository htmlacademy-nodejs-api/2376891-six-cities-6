import { Request } from 'express';
import { TRequestBody, TRequestParams } from '../../../libs/rest/index.js';
import { CreateCommentDto } from '../dto/create-comment.dto.js';

export type TCreateCommentRequest = Request<TRequestParams, TRequestBody, CreateCommentDto>;
