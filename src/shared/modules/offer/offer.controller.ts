import { inject, injectable } from 'inversify';
import { BaseController, DocumentExistsMiddleware, EHttpMethod, HttpError, PrivateRouteMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { EComponent } from '../../types/component.enum.js';
import { ILogger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { TParamOfferId } from './type/param-offerId.type.js';
import { TParamCity } from './type/param-city.type.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { TCreateOfferRequest } from './type/create-offer-request.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { ICommentService, CreateOfferDto, DEFAULT_OFFER_COUNT, ECommentsConstraint, PreviewOfferRdo, IUserService } from '../index.js';
import { TFindOfferRequest } from './type/find-offer.request.type.js';
import { ObjectId } from 'mongodb';
import { UpdateFavoritesDto } from '../user/dto/update-favorites.dto.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(EComponent.Logger) protected logger: ILogger,
    @inject(EComponent.OfferService) private readonly offerService: OfferService,
    @inject(EComponent.UserService) private readonly userService: IUserService,
    @inject(EComponent.CommentService) private readonly commentService: ICommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({
      path: '/favorites',
      method: EHttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [ new PrivateRouteMiddleware()]
    });
    this.addRoute({
      path: '/:offerId',
      method: EHttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({ path: '/', method: EHttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: EHttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: EHttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: EHttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({ path: '/:city/premium', method: EHttpMethod.Get, handler: this.getPremium });
    this.addRoute({
      path: '/:offerId/updateFavorites',
      method: EHttpMethod.Patch,
      handler: this.updateFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateFavoritesDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  public async show({ params, tokenPayload }: Request<TParamOfferId, unknown, CreateOfferDto>, res: Response): Promise<void> {
    const user = await this.userService.findUnique({ _id: tokenPayload?.id });
    const newFavorites = new Set(user?.favorites.map((offer) => offer.id));
    const offer = await this.offerService.findByOfferId({userId: tokenPayload?.id, offerId: params.offerId, userFavorites: [...newFavorites]});
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async index({query, tokenPayload}: TFindOfferRequest, res: Response): Promise<void> {
    const offerCount = query?.limit ? Number(query.limit) : DEFAULT_OFFER_COUNT;
    const user = await this.userService.findUnique({ _id: tokenPayload?.id });
    const offers = await this.offerService.find({userId: tokenPayload?.id, offerCount: offerCount, userFavorites: user?.favorites});
    this.ok(res, fillDTO(PreviewOfferRdo, offers));
  }

  public async create({ body, tokenPayload }: TCreateOfferRequest, res: Response): Promise<void> {
    const { isFavorite, ...rest } = body;
    const offerRating = Number(body.rating.toFixed(1));
    const user = await this.userService.findUnique({ _id: tokenPayload.id });
    if (!user) {
      throw new Error('User not found.');
    }
    const result = await this.offerService.create({
      ...rest,
      userId: tokenPayload.id,
      commentCount: ECommentsConstraint.Min,
      rating: offerRating
    });

    let newFavorites = new Set(user.favorites.map((offer) => offer.id));

    if (isFavorite) {
      newFavorites = newFavorites.add(result.id);
      await this.userService.updateById(tokenPayload.id, {
        favorites: [...newFavorites]
      });
    }

    const offer = await this.offerService.findByOfferId({
      userId: tokenPayload.id,
      offerId: result.id,
      userFavorites: [...newFavorites] });
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete({ params, tokenPayload }: Request<TParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offerToDelete = await this.offerService.findByOfferId({ offerId: params.offerId });
    if (offerToDelete && offerToDelete[0].userId.toString() !== new ObjectId(tokenPayload.id).toString()) {
      throw new Error('You can only edit your own offers.');
    }
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update({ body, params, tokenPayload }: Request<TParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const offerToUpdate = await this.offerService.findByOfferId({ offerId: params.offerId });

    if (offerToUpdate && offerToUpdate[0].userId.toString() !== new ObjectId(tokenPayload.id).toString()) {
      throw new Error('You can only edit your own offers.');
    }
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getPremium({ params, tokenPayload }: Request<TParamCity, unknown, CreateOfferDto>, res: Response): Promise<void> {
    const { city } = params;
    const user = await this.userService.findUnique({ _id: tokenPayload?.id });
    const premiumOffers = await this.offerService.findPremium({userId: tokenPayload?.id, city, userFavorites: user?.favorites});
    this.ok(res, fillDTO(PreviewOfferRdo, premiumOffers));
  }

  public async getFavorites({ tokenPayload: {id} }: Request, res: Response) {
    const user = await this.userService.findUnique({ _id: id });
    const favoriteOffers = await this.offerService.findFavorites(user?.favorites);
    this.ok(res, fillDTO(PreviewOfferRdo, favoriteOffers));
  }

  public async updateFavorites({ params, tokenPayload }: Request<TParamOfferId, unknown, UpdateFavoritesDto>, res: Response) {
    const user = await this.userService.findUnique({ _id: tokenPayload.id });
    if (!user) {
      throw new Error('User not found.');
    }
    if (!(await this.offerService.exists(params.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'UserController',
      );
    }
    const newFavorites = new Set(user.favorites.map((offer) => offer.id));

    if (user.favorites.some((favorite) => favorite._id.equals(params.offerId))) {
      newFavorites.delete(params.offerId);
      await this.userService.updateById(tokenPayload.id, {
        favorites: [...newFavorites]
      });
    } else {
      newFavorites.add(params.offerId);
      await this.userService.updateById(tokenPayload.id, {
        favorites: [...newFavorites]
      });
    }
    this.noContent(res, null);
  }
}
