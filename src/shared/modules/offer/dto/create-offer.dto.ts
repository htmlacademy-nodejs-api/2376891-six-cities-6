import { ECityName, EOfferType, EGood, TLocation } from '../../../types/index.js';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public date!: Date;
  public city!: ECityName;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public offerType!: EOfferType;
  public bedrooms!: number;
  public maxAdults!: number;
  public price!: number;
  public goods!: EGood[];
  public userId!: string;
  public commentCount!: number;
  public location!: TLocation;
}
