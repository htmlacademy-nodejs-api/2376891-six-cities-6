import { OfferService } from './offer-service.interface.js';
import { inject, injectable } from 'inversify';
import { EComponent, ESortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import {
  DEFAULT_OFFER_COUNT,
  DEFAULT_PREMIUM_OFFER_COUNT
} from './offer.constant.js';
import { ObjectId } from 'mongodb';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(EComponent.Logger) private readonly logger: Logger,
    @inject(EComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async find(userId?: string, offerCount?: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        { $sort: { createdAt: ESortType.Down } },
        { $limit: offerCount ?? DEFAULT_OFFER_COUNT },
        {
          $project: {
            _id: 1,
            title: 1,
            date: 1,
            city: 1,
            previewImage: 1,
            isPremium: 1,
            rating: 1,
            offerType: 1,
            price: 1,
            commentCount: 1,
            userId: 1,
          }
        },
        {
          $lookup: {
            from: 'users',
            pipeline: [
              {
                $match: {
                  _id: new ObjectId(userId)
                }
              },
            ],
            as: 'authUser'
          }
        },
        { $addFields: { isFavorite: { $in: ['$_id', '$authUser.favorites'] } } },
        { $unset: ['_id', 'authUser', 'userId']}
      ]);
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async findPremium(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city })
      .sort({ createAt: ESortType.Down })
      .limit(DEFAULT_PREMIUM_OFFER_COUNT)
      .populate(['userId'])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentCount: 1,
        }})
      .exec();
  }
}
