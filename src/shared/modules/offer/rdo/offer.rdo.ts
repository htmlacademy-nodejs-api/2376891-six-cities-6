import { Expose } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { EOfferType, TLocation, EGood, ECityName } from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: string;

  @Expose()
  public city!: ECityName;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public offerType!: EOfferType;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public price!: number;

  @Expose()
  public goods!: EGood[];

  @Expose()
  public userId!: UserRdo;

  @Expose()
  public commentCount!: number;

  @Expose()
  public location!: TLocation;
}
