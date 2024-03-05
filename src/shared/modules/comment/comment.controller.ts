import { inject, injectable } from 'inversify';
import { BaseController, HttpError, EHttpMethod, ValidateDtoMiddleware, PrivateRouteMiddleware } from '../../libs/rest/index.js';
import { EComponent } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { CommentRdo, OfferService, ICommentService, CreateCommentDto } from '../index.js';
import { TCreateCommentRequest } from './types/create-comment-request.type.js';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/common.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(EComponent.Logger) protected readonly logger: ILogger,
    @inject(EComponent.CommentService) private readonly commentService: ICommentService,
    @inject(EComponent.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');
    this.addRoute({
      path: '/',
      method: EHttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: EHttpMethod.Get,
      handler: this.getOfferComments,
    });
  }

  public async create({ body, tokenPayload }: TCreateCommentRequest, res: Response): Promise<void> {
    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({...body, userId: tokenPayload.id});
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }

  public async getOfferComments({ params: {offerId} }: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
