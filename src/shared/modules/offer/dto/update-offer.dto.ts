import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsLatitude, IsLongitude, IsObject, IsOptional, IsString, Length, Max, MaxLength, Min } from 'class-validator';
import { OFFER_DTO_CONSTRAINT, OFFER_DTO_MESSAGES } from '../offer.constant.js';
import { ECityName, EOfferType, EGood, TLocation } from '../../../types/index.js';
import { Type } from 'class-transformer';

class Location {
  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  @Length(OFFER_DTO_CONSTRAINT.TITLE.MIN, OFFER_DTO_CONSTRAINT.TITLE.MAX)
  public title?: string;

  @IsOptional()
  @IsString()
  @Length(OFFER_DTO_CONSTRAINT.DESCRIPTION.MIN, OFFER_DTO_CONSTRAINT.DESCRIPTION.MAX)
  public description?: string;

  @IsOptional()
  public date?: Date;

  @IsOptional()
  @IsEnum(ECityName, {message: OFFER_DTO_MESSAGES.CITY})
  public city?: ECityName;

  @IsOptional()
  @MaxLength(OFFER_DTO_CONSTRAINT.PREVIEW.MAX)
  public previewImage?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(OFFER_DTO_CONSTRAINT.IMAGES, {message: OFFER_DTO_MESSAGES.IMAGES})
  @ArrayMaxSize(OFFER_DTO_CONSTRAINT.IMAGES, {message: OFFER_DTO_MESSAGES.IMAGES})
  public images?: string[];

  @IsOptional()
  @IsBoolean()
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean()
  public isFavorite?: boolean;

  @IsOptional()
  @IsEnum(EOfferType, {message: OFFER_DTO_MESSAGES.OFFER_TYPE})
  public offerType?: EOfferType;

  @IsOptional()
  @IsInt()
  @Min(OFFER_DTO_CONSTRAINT.BEDROOMS.MIN)
  @Max(OFFER_DTO_CONSTRAINT.BEDROOMS.MAX)
  public bedrooms?: number;

  @IsOptional()
  @IsInt()
  @Min(OFFER_DTO_CONSTRAINT.ADULTS.MIN)
  @Max(OFFER_DTO_CONSTRAINT.ADULTS.MAX)
  public maxAdults?: number;

  @IsOptional()
  @IsInt()
  @Min(OFFER_DTO_CONSTRAINT.PRICE.MIN)
  @Max(OFFER_DTO_CONSTRAINT.PRICE.MAX)
  public price?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(EGood, { each: true, message: OFFER_DTO_MESSAGES.GOODS })
  public goods?: EGood[];

  @IsOptional()
  public userId?: string;

  // @IsOptional()
  // @IsInt({message: OFFER_DTO_VALIDATION_MESSAGES.commentCount})
  // public commentCount?: number;

  @IsOptional()
  @IsObject({ message: OFFER_DTO_MESSAGES.LOCATION })
  @Type(() => Location)
  public location?: TLocation;
}
