import { CityName, HousingType, Good, TLocation } from '../../../types/index.js';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public date!: Date;
  public city!: CityName;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public housingType!: HousingType;
  public bedrooms!: number;
  public maxAdults!: number;
  public price!: number;
  public goods!: Good[];
  public userId!: string;
  public comments!: number;
  public location!: TLocation;
}
