import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsLatitude, IsLongitude, IsMongoId, IsObject,
  IsUrl,
  Matches,
  Max, MaxLength, Min, MinLength
} from 'class-validator';
import { ECityName, EOfferType, EGood, TLocation } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { Type } from 'class-transformer';
import {
  EAdults, EBedrooms, EDescriptionConstraint, EPrice, ETitleConstraint,
  IMAGE_COUNT
} from '../../../../utils/const.js';

class Location {
  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}

export class CreateOfferDto {
  @MinLength(ETitleConstraint.Min, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(ETitleConstraint.Max, {message: CreateOfferValidationMessage.title.maxLength})
  public title!: string;

  @MinLength(EDescriptionConstraint.Min, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(EDescriptionConstraint.Max, {message: CreateOfferValidationMessage.description.maxLength})
  public description!: string;

  @IsDateString({}, {message: CreateOfferValidationMessage.date.invalidFormat})
  public date!: Date;

  @IsEnum(ECityName, {message: CreateOfferValidationMessage.city.invalid})
  public city!: ECityName;

  @IsUrl({ message: CreateOfferValidationMessage.previewImage.invalid })
  @Matches(/\.(jpg|png)(\?.*)?$/i)
  public previewImage!: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(IMAGE_COUNT, {message: CreateOfferValidationMessage.images.invalid})
  @ArrayMaxSize(IMAGE_COUNT, {message: CreateOfferValidationMessage.images.invalid})
  public images!: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public isPremium!: boolean;

  @IsEnum(EOfferType, {message: CreateOfferValidationMessage.offerType.invalid})
  public offerType!: EOfferType;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(EBedrooms.Min)
  @Max(EBedrooms.Max)
  public bedrooms!: number;

  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(EAdults.Min)
  @Max(EAdults.Max)
  public maxAdults!: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(EPrice.Min, { message: CreateOfferValidationMessage.price.minValue })
  @Max(EPrice.Max, {message: CreateOfferValidationMessage.price.maxValue})
  public price!: number;

  @IsArray({message: CreateOfferValidationMessage.goods.invalidFormat})
  @IsEnum(EGood, { each: true, message: CreateOfferValidationMessage.goods.invalid })
  public goods!: EGood[];

  @IsMongoId({message: CreateOfferValidationMessage.userId.invalidId})
  public userId!: string;

  @IsInt({message: CreateOfferValidationMessage.commentCount.invalidFormat})
  public commentCount!: number;

  @IsObject({ message: CreateOfferValidationMessage.location.invalid })
  @Type(() => Location)
  public location!: TLocation;
}
