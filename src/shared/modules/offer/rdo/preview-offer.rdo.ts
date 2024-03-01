import { Expose } from 'class-transformer';
import { EOfferType } from '../../../types/housing-type.enum.js';
import { ECityName } from '../../../types/city-name.enum.js';

export class PreviewOfferRdo {
  // @Expose()
  // public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public date!: string;

  @Expose()
  public city!: ECityName;

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public offerType!: EOfferType;

  @Expose()
  public price!: number;

  @Expose()
  public commentCount!: number;
}

