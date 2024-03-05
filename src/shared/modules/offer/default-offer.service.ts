import { OfferService } from './offer-service.interface.js';
import { inject, injectable } from 'inversify';
import { EComponent, ESortType, TFindOfferParameters } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { DocumentType, Ref, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { ObjectId } from 'mongodb';
import { TFindPremiumOfferParameters } from './type/find-premium-offer-parameters.type.js';
import { TAddFavoriteOfferParameters } from './type/add-favorite-parameters.type.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(EComponent.Logger) private readonly logger: ILogger,
    @inject(EComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findByOfferId(data: TAddFavoriteOfferParameters): Promise<DocumentType<OfferEntity>[] | null> {
    const offerIdObject = new ObjectId(data.offerId);
    const detailOffer = await this.offerModel
      .aggregate([
        { $match: { _id: offerIdObject } },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'offerComments',
          },
        },
        {
          $unwind: {
            path: '$offerComments',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            description: { $first: '$description' },
            date: { $first: '$createdAt' },
            city: { $first: '$city' },
            previewImage: { $first: '$previewImage' },
            images: { $first: '$images' },
            isPremium: { $first: '$isPremium' },
            bedrooms: { $first: '$bedrooms' },
            maxAdults: { $first: '$maxAdults' },
            offerComments: {$first: '$offerComments'},
            averageRating: {$avg: '$offerComments.rating'},
            offerType: { $first: '$offerType' },
            price: { $first: '$price' },
            goods: { $first: '$goods' },
            userId: { $first: '$userId' },
            commentCount: { $first: '$commentCount' },
            location: { $first: '$location' },
          }
        },
        {
          $lookup: {
            from: 'users',
            pipeline: [
              {
                $match: {
                  _id: 'userId'
                }
              },
            ],
            as: 'authUser'
          }
        },
        {
          $addFields: {
            offerComments: '$offerComments',
            rating: {
              $cond: {
                if: { $eq: ['$averageRating', null] },
                then: 0,
                else: '$averageRating',
              }
            },
            isFavorite: {
              $cond: {
                if: { $gt: [{ $size: { $ifNull: [data.userFavorites, []] } }, 0] },
                then: {$in: [data.offerId, data.userFavorites]},
                else: false
              }
            },
          }
        },
        { $unset: ['_id', 'authUser', 'offerComments', 'averageRating', 'user']}
      ]).exec();
    return detailOffer;
  }

  public async find(params: TFindOfferParameters): Promise<DocumentType<OfferEntity>[]> {
    const result = await this.offerModel
      .aggregate([
        { $sort: { date: ESortType.Down } },
        { $limit: params.offerCount },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'offerComments',
          },
        },
        {
          $unwind: {
            path: '$offerComments',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            id: {$first: '$id'},
            title: { $first: '$title' },
            date: { $first: '$date' },
            city: { $first: '$city' },
            previewImage: { $first: '$previewImage' },
            isPremium: { $first: '$isPremium' },
            offerComments: {$first: '$offerComments'},
            averageRating: {$avg: '$offerComments.rating'},
            offerType: { $first: '$offerType' },
            price: { $first: '$price' },
            commentCount: { $first: '$commentCount' },
            userId: { $first: '$userId' },
          }
        },
        {
          $lookup: {
            from: 'users',
            pipeline: [
              {
                $match: {
                  _id: new ObjectId(params.userId)
                }
              },
            ],
            as: 'authUser'
          }
        },
        {
          $addFields: {
            offerComments: '$offerComments',
            rating: {
              $cond: {
                if: { $eq: ['$averageRating', null] },
                then: 0,
                else: '$averageRating',
              }
            },
            isFavorite: {
              $cond: {
                if: { $gt: [{ $size: { $ifNull: [params.userFavorites, []] } }, 0] },
                then: {$in: ['$_id', params.userFavorites]},
                else: false
              }
            },
          }
        },
        { $unset: ['_id', 'authUser', 'userId', 'offerComments', 'averageRating']}
      ]).exec();
    return result;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string | undefined, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async findPremium(params: TFindPremiumOfferParameters): Promise<DocumentType<OfferEntity>[]> {
    const { city } = params;

    const result = await this.offerModel
      .aggregate([
        { $sort: { date: ESortType.Down } },
        { $match: { city: city, isPremium: true } },
        { $limit: DEFAULT_PREMIUM_OFFER_COUNT },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'offerComments',
          },
        },
        {
          $unwind: {
            path: '$offerComments',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            date: { $first: '$date' },
            city: { $first: '$city' },
            previewImage: { $first: '$previewImage' },
            isPremium: { $first: '$isPremium' },
            offerComments: {$first: '$offerComments'},
            averageRating: {$avg: '$offerComments.rating'},
            offerType: { $first: '$offerType' },
            price: { $first: '$price' },
            commentCount: { $first: '$commentCount' },
            userId: { $first: '$userId' },
          }
        },
        {
          $lookup: {
            from: 'users',
            pipeline: [
              {
                $match: {
                  _id: new ObjectId(params.userId)
                }
              },
            ],
            as: 'authUser'
          }
        },
        {
          $addFields: {
            offerComments: '$offerComments',
            rating: {
              $cond: {
                if: { $eq: ['$averageRating', null] },
                then: 0,
                else: '$averageRating',
              }
            },
            isFavorite: {
              $cond: {
                if: { $gt: [{ $size: { $ifNull: [params.userFavorites, []] } }, 0] },
                then: {$in: ['$_id', params.userFavorites]},
                else: false
              }
            },
          }
        },
        { $unset: ['_id', 'authUser', 'userId', 'offerComments', 'averageRating']}
      ]).exec();
    return result;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentCount: 1,
        }})
      .exec();
  }

  public async findFavorites(favorites: Ref<OfferEntity>[] | undefined): Promise<DocumentType<OfferEntity>[]>{
    const userFavorites = await this.offerModel
      .aggregate([
        {
          $match: {
            _id: { $in: favorites }
          },
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'offerComments',
          }
        },
        {
          $unwind: {
            path: '$offerComments',
            preserveNullAndEmptyArrays: true,
          }
        },
        {
          $group: {
            _id: '$_id',
            title: { $first: '$title' },
            date: { $first: '$date' },
            city: { $first: '$city' },
            previewImage: {$first: '$previewImage'},
            isPremium: { $first: '$isPremium' },
            isFavorite: { $first: { $in: ['$_id', favorites]}},
            rating: {$avg: { $ifNull: ['$offerComments.rating', 0]}},
            offerType: { $first: '$offerType' },
            price: { $first: '$price' },
            commentCount: { $first: '$commentCount' },
          }
        },
        {
          $unset: '_id',
        },
      ]).exec();
    return userFavorites;
  }
}
