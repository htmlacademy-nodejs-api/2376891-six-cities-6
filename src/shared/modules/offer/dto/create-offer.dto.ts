import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsLatitude, IsLongitude, IsMongoId, IsObject,
  IsUrl,
  Matches,
  Max, MaxLength, Min, MinLength
} from 'class-validator';
import { ECityName, EOfferType, EGood, TLocation } from '../../../types/index.js';
import { OfferDtoValidationMessages } from './offer-dto.messages.js';
import { Type } from 'class-transformer';
import { OfferDtoConstraint } from '../../../../utils/const.js';

class Location {
  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}

export class CreateOfferDto {
  @MinLength(OfferDtoConstraint.Title.Min, { message: OfferDtoValidationMessages.title.minLength })
  @MaxLength(OfferDtoConstraint.Title.Max, {message: OfferDtoValidationMessages.title.maxLength})
  public title!: string;

  @MinLength(OfferDtoConstraint.Description.Min, { message: OfferDtoValidationMessages.description.minLength })
  @MaxLength(OfferDtoConstraint.Description.Max, {message: OfferDtoValidationMessages.description.maxLength})
  public description!: string;

  @IsDateString({}, {message: OfferDtoValidationMessages.date.invalidFormat})
  public date!: Date;

  @IsEnum(ECityName, {message: OfferDtoValidationMessages.city.invalid})
  public city!: ECityName;

  @IsUrl({ message: OfferDtoValidationMessages.previewImage.invalid })
  @Matches(/\.(jpg|png)(\?.*)?$/i)
  public previewImage!: string;

  @IsArray({ message: OfferDtoValidationMessages.images.invalidFormat })
  @ArrayMinSize(OfferDtoConstraint.Images, {message: OfferDtoValidationMessages.images.invalid})
  @ArrayMaxSize(OfferDtoConstraint.Images, {message: OfferDtoValidationMessages.images.invalid})
  public images!: string[];

  @IsBoolean({message: OfferDtoValidationMessages.isPremium.invalidFormat})
  public isPremium!: boolean;

  @IsEnum(EOfferType, {message: OfferDtoValidationMessages.offerType.invalid})
  public offerType!: EOfferType;

  @IsInt({ message: OfferDtoValidationMessages.bedrooms.invalidFormat })
  @Min(OfferDtoConstraint.Bedrooms.Min)
  @Max(OfferDtoConstraint.Bedrooms.Max)
  public bedrooms!: number;

  @IsInt({ message: OfferDtoValidationMessages.maxAdults.invalidFormat })
  @Min(OfferDtoConstraint.Adults.Min)
  @Max(OfferDtoConstraint.Adults.Max)
  public maxAdults!: number;

  @IsInt({ message: OfferDtoValidationMessages.price.invalidFormat })
  @Min(OfferDtoConstraint.Price.Min, { message: OfferDtoValidationMessages.price.minValue })
  @Max(OfferDtoConstraint.Price.Max, {message: OfferDtoValidationMessages.price.maxValue})
  public price!: number;

  @IsArray({message: OfferDtoValidationMessages.goods.invalidFormat})
  @IsEnum(EGood, { each: true, message: OfferDtoValidationMessages.goods.invalid })
  public goods!: EGood[];

  @IsMongoId({message: OfferDtoValidationMessages.userId.invalidId})
  public userId!: string;

  @IsInt({message: OfferDtoValidationMessages.commentCount.invalidFormat})
  public commentCount!: number;

  @IsObject({ message: OfferDtoValidationMessages.location.invalid })
  @Type(() => Location)
  public location!: TLocation;
}
