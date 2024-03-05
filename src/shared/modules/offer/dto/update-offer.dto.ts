import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsLatitude, IsLongitude, IsObject, IsOptional, IsString, Length, Max, MaxLength, Min } from 'class-validator';
import { OfferDtoConstraint, OfferDtoMessages } from '../offer.constant.js';
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
  @Length(OfferDtoConstraint.Title.MIN, OfferDtoConstraint.Title.MAX)
  public title?: string;

  @IsOptional()
  @IsString()
  @Length(OfferDtoConstraint.Description.MIN, OfferDtoConstraint.Description.MAX)
  public description?: string;

  @IsOptional()
  public date?: Date;

  @IsOptional()
  @IsEnum(ECityName, {message: OfferDtoMessages.City})
  public city?: ECityName;

  @IsOptional()
  @MaxLength(OfferDtoConstraint.Preview.MAX)
  public previewImage?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(OfferDtoConstraint.Images, {message: OfferDtoMessages.Images})
  @ArrayMaxSize(OfferDtoConstraint.Images, {message: OfferDtoMessages.Images})
  public images?: string[];

  @IsOptional()
  @IsBoolean()
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean()
  public isFavorite?: boolean;

  @IsOptional()
  @IsEnum(EOfferType, {message: OfferDtoMessages.OfferType})
  public offerType?: EOfferType;

  @IsOptional()
  @IsInt()
  @Min(OfferDtoConstraint.Bedrooms.MIN)
  @Max(OfferDtoConstraint.Bedrooms.MAX)
  public bedrooms?: number;

  @IsOptional()
  @IsInt()
  @Min(OfferDtoConstraint.Adults.MIN)
  @Max(OfferDtoConstraint.Adults.MAX)
  public maxAdults?: number;

  @IsOptional()
  @IsInt()
  @Min(OfferDtoConstraint.Price.MIN)
  @Max(OfferDtoConstraint.Price.MAX)
  public price?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(EGood, { each: true, message: OfferDtoMessages.Goods })
  public goods?: EGood[];

  @IsOptional()
  public userId?: string;

  @IsOptional()
  @IsObject({ message: OfferDtoMessages.Location })
  @Type(() => Location)
  public location?: TLocation;
}
