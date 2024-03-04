import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../libs/rest/index.js';
import { CreateOfferDto } from '../dto/create-offer.dto.js';

export type TFindOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
