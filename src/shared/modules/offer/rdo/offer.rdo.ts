import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { EOfferType } from '../../../types/housing-type.enum.js';
import { TLocation } from '../../../types/location.type.js';
import { EGood } from '../../../types/good.enum.js';
import { ECityName } from '../../../types/city-name.enum.js';

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

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose()
  public commentCount!: number;

  @Expose()
  public location!: TLocation;
}
