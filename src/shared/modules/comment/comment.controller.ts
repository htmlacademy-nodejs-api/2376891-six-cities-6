import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { EComponent } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { CommentRdo, OfferService, CommentService } from '../index.js';
import { TCreateCommentRequest } from './types/create-comment-request.type.js';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/common.js';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(EComponent.Logger) protected readonly logger: Logger,
    @inject(EComponent.CommentService) private readonly commentService: CommentService,
    @inject(EComponent.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async create({ body }: TCreateCommentRequest, res: Response): Promise<void> {
    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
