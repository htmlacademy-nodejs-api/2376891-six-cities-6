import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsObject,
  IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ECityName, EOfferType, EGood, TLocation } from '../../../types/index.js';
import { Type } from 'class-transformer';
import { OFFER_DTO_CONSTRAINT, OFFER_DTO_MESSAGES } from '../../index.js';

class Location {
  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(OFFER_DTO_CONSTRAINT.TITLE.MIN)
  @MaxLength(OFFER_DTO_CONSTRAINT.TITLE.MAX)
  public title!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(OFFER_DTO_CONSTRAINT.DESCRIPTION.MIN)
  @MaxLength(OFFER_DTO_CONSTRAINT.DESCRIPTION.MAX)
  public description!: string;

  @IsNotEmpty({message: OFFER_DTO_MESSAGES.DATE})
  public date!: Date;

  @IsNotEmpty()
  @IsEnum(ECityName, {message: OFFER_DTO_MESSAGES.CITY})
  public city!: ECityName;

  @IsNotEmpty()
  @MaxLength(OFFER_DTO_CONSTRAINT.PREVIEW.MAX)
  public previewImage!: string;

  @IsArray()
  @ArrayMinSize(OFFER_DTO_CONSTRAINT.IMAGES, {message: OFFER_DTO_MESSAGES.IMAGES})
  @ArrayMaxSize(OFFER_DTO_CONSTRAINT.IMAGES, {message: OFFER_DTO_MESSAGES.IMAGES})
  public images!: string[];

  @IsNotEmpty()
  @IsBoolean()
  public isPremium!: boolean;

  @IsNotEmpty()
  @IsBoolean()
  public isFavorite?: boolean;

  @IsNotEmpty()
  @IsEnum(EOfferType, {message: OFFER_DTO_MESSAGES.OFFER_TYPE})
  public offerType!: EOfferType;

  @IsNotEmpty()
  @IsInt()
  @Min(OFFER_DTO_CONSTRAINT.BEDROOMS.MIN)
  @Max(OFFER_DTO_CONSTRAINT.BEDROOMS.MAX)
  public bedrooms!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(OFFER_DTO_CONSTRAINT.ADULTS.MIN)
  @Max(OFFER_DTO_CONSTRAINT.ADULTS.MAX)
  public maxAdults!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(OFFER_DTO_CONSTRAINT.PRICE.MIN)
  @Max(OFFER_DTO_CONSTRAINT.PRICE.MAX)
  public price!: number;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(EGood, { each: true, message: OFFER_DTO_MESSAGES.GOODS })
  public goods!: EGood[];

  public userId!: string;

  @IsInt()
  public commentCount!: number;

  @IsNotEmpty()
  @IsObject({ message: OFFER_DTO_MESSAGES.LOCATION })
  @Type(() => Location)
  public location!: TLocation;
}
