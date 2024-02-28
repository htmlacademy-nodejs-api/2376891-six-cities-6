import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsLatitude, IsLongitude, IsMongoId, IsObject, IsOptional, IsUrl, Length, Matches, Max, Min } from 'class-validator';
import { OfferDtoConstraint } from '../../../../utils/const.js';
import { ECityName, EOfferType, EGood, TLocation } from '../../../types/index.js';
import { OfferDtoValidationMessages } from './offer-dto.messages.js';
import { Type } from 'class-transformer';

class Location {
  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}

export class UpdateOfferDto {
  @IsOptional()
  @Length(OfferDtoConstraint.Title.Min, OfferDtoConstraint.Title.Max, { message: OfferDtoValidationMessages.title.minLength })
  public title?: string;

  @IsOptional()
  @Length(OfferDtoConstraint.Description.Min, OfferDtoConstraint.Description.Max, { message: OfferDtoValidationMessages.description.minLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: OfferDtoValidationMessages.date.invalidFormat})
  public date?: Date;

  @IsOptional()
  @IsEnum(ECityName, {message: OfferDtoValidationMessages.city.invalid})
  public city?: ECityName;

  @IsOptional()
  @IsUrl({ message: OfferDtoValidationMessages.previewImage.invalid })
  @Matches(/\.(jpg|png)(\?.*)?$/i)
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: OfferDtoValidationMessages.images.invalidFormat })
  @ArrayMinSize(OfferDtoConstraint.Images, {message: OfferDtoValidationMessages.images.invalid})
  @ArrayMaxSize(OfferDtoConstraint.Images, {message: OfferDtoValidationMessages.images.invalid})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: OfferDtoValidationMessages.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(EOfferType, {message: OfferDtoValidationMessages.offerType.invalid})
  public offerType?: EOfferType;

  @IsOptional()
  @IsInt({ message: OfferDtoValidationMessages.bedrooms.invalidFormat })
  @Min(OfferDtoConstraint.Bedrooms.Min)
  @Max(OfferDtoConstraint.Bedrooms.Max)
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: OfferDtoValidationMessages.maxAdults.invalidFormat })
  @Min(OfferDtoConstraint.Adults.Min)
  @Max(OfferDtoConstraint.Adults.Max)
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: OfferDtoValidationMessages.price.invalidFormat })
  @Min(OfferDtoConstraint.Price.Min, { message: OfferDtoValidationMessages.price.minValue })
  @Max(OfferDtoConstraint.Price.Max, {message: OfferDtoValidationMessages.price.maxValue})
  public price?: number;

  @IsOptional()
  @IsArray({message: OfferDtoValidationMessages.goods.invalidFormat})
  @IsEnum(EGood, { each: true, message: OfferDtoValidationMessages.goods.invalid })
  public goods?: EGood[];

  @IsOptional()
  @IsMongoId({message: OfferDtoValidationMessages.userId.invalidId})
  public userId?: string;

  @IsOptional()
  @IsInt({message: OfferDtoValidationMessages.commentCount.invalidFormat})
  public commentCount?: number;

  @IsOptional()
  @IsObject({ message: OfferDtoValidationMessages.location.invalid })
  @Type(() => Location)
  public location?: TLocation;
}
