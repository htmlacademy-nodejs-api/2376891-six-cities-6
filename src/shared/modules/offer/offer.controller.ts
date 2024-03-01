import { inject, injectable } from 'inversify';
import { BaseController, DocumentExistsMiddleware, HttpMethod, PrivateRouteMiddleware, ValidateDtoMiddleware, ValidateObjectIdMiddleware } from '../../libs/rest/index.js';
import { EComponent } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { TParamOfferId } from './type/param-offerId.type.js';
import { TParamCity } from './type/param-city.type.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { TCreateOfferRequest } from './type/create-offer-request.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CommentService, CreateOfferDto, DEFAULT_OFFER_COUNT, PreviewOfferRdo, UserService } from '../index.js';
import { TFindOfferRequest } from './type/find-offer.request.type.js';
import { ObjectId } from 'mongodb';
import { UpdateFavoritesDto } from '../user/dto/update-favorites.dto.js';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(EComponent.Logger) protected logger: Logger,
    @inject(EComponent.OfferService) private readonly offerService: OfferService,
    @inject(EComponent.UserService) private readonly userService: UserService,
    @inject(EComponent.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [ new PrivateRouteMiddleware()]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({ path: '/:city/premium', method: HttpMethod.Get, handler: this.getPremium });
    this.addRoute({
      path: '/:offerId/addFavorite',
      method: HttpMethod.Patch,
      handler: this.addFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateFavoritesDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/deleteFavorite',
      method: HttpMethod.Patch,
      handler: this.deleteFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  public async show({ params, tokenPayload }: Request<TParamOfferId, unknown, CreateOfferDto>, res: Response): Promise<void> {
    const user = await this.userService.findUnique({ _id: tokenPayload.id });
    const offer = await this.offerService.findByOfferId({userId: tokenPayload?.id, offerId: params.offerId, userFavorites: user?.favorites});
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async index({query, tokenPayload}: TFindOfferRequest, res: Response): Promise<void> {
    const offerCount = query?.limit ? Number(query.limit) : DEFAULT_OFFER_COUNT;
    const user = await this.userService.findUnique({_id: tokenPayload?.id});
    const offers = await this.offerService.find({userId: tokenPayload?.id, offerCount: offerCount, userFavorites: user?.favorites});
    this.ok(res, fillDTO(PreviewOfferRdo, offers));
  }

  public async create({ body, tokenPayload }: TCreateOfferRequest, res: Response): Promise<void> {
    const { isFavorite, ...rest } = body;

    const result = await this.offerService.create({ ...rest, userId: tokenPayload.id });

    if (isFavorite) {
      const user = await this.userService.findUnique({ _id: tokenPayload.id });
      if (!user) {
        throw new Error('User not found.');
      }

      user.favorites.push(new ObjectId(result._id));
      await this.userService.updateById(tokenPayload.id, user);
    }

    const offer = await this.offerService.findByOfferId(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete({ params }: Request<TParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update({ body, params }: Request<TParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
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

  public async addFavorite({ params, tokenPayload }: Request<TParamOfferId, unknown, UpdateOfferDto>, res: Response) {
    const user = await this.userService.findUnique({ _id: tokenPayload.id });
    if (!user) {
      throw new Error('User not found.');
    }
    if (user.favorites.includes(new ObjectId(params.offerId))) {
      throw new Error('Offer is already added to favorites.');
    }
    user.favorites.push(new ObjectId(params.offerId));
    await this.userService.updateById(tokenPayload.id, user);
    this.noContent(res, null);
  }

  public async deleteFavorite({params, tokenPayload}: Request<TParamOfferId, unknown, UpdateOfferDto>, res: Response) {
    const user = await this.userService.findUnique({ _id: tokenPayload.id });
    if (!user) {
      throw new Error('User not found.');
    }
    if (!user.favorites.includes(new ObjectId(params.offerId))) {
      throw new Error('Offer is already deleted from favorites.');
    }
    const offerIdObject = new ObjectId(params.offerId);

    user.favorites = user.favorites.filter((favorite) => favorite.toString() !== offerIdObject.toString());
    await this.userService.updateById(tokenPayload.id, user);
    await this.commentService.deleteByOfferId(params.offerId);
    this.noContent(res, null);
  }
}
