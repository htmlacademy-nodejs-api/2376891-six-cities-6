import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsObject,
  IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { ECityName, EOfferType, EGood, TLocation } from '../../../types/index.js';
import { Type } from 'class-transformer';
import { OfferDtoConstraint, OfferDtoMessages } from '../../index.js';

class Location {
  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(OfferDtoConstraint.Title.MIN)
  @MaxLength(OfferDtoConstraint.Title.MAX)
  public title!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(OfferDtoConstraint.Description.MIN)
  @MaxLength(OfferDtoConstraint.Description.MAX)
  public description!: string;

  @IsNotEmpty({message: OfferDtoMessages.Date})
  public date!: Date;

  @IsNotEmpty()
  @IsEnum(ECityName, {message: OfferDtoMessages.City})
  public city!: ECityName;

  @IsNotEmpty()
  @MaxLength(OfferDtoConstraint.Preview.MAX)
  public previewImage!: string;

  @IsArray()
  @ArrayMinSize(OfferDtoConstraint.Images, {message: OfferDtoMessages.Images})
  @ArrayMaxSize(OfferDtoConstraint.Images, {message: OfferDtoMessages.Images})
  public images!: string[];

  @IsNotEmpty()
  @IsBoolean()
  public isPremium!: boolean;

  @IsNotEmpty()
  @IsBoolean()
  public isFavorite?: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Min(OfferDtoConstraint.Rating.MIN)
  @Max(OfferDtoConstraint.Rating.MAX)
  public rating!: number;

  @IsNotEmpty()
  @IsEnum(EOfferType, {message: OfferDtoMessages.OfferType})
  public offerType!: EOfferType;

  @IsNotEmpty()
  @IsInt()
  @Min(OfferDtoConstraint.Bedrooms.MIN)
  @Max(OfferDtoConstraint.Bedrooms.MAX)
  public bedrooms!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(OfferDtoConstraint.Adults.MIN)
  @Max(OfferDtoConstraint.Adults.MAX)
  public maxAdults!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(OfferDtoConstraint.Price.MIN)
  @Max(OfferDtoConstraint.Price.MAX)
  public price!: number;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(EGood, { each: true, message: OfferDtoMessages.Goods })
  public goods!: EGood[];

  public userId!: string;

  @IsOptional()
  @IsInt()
  public commentCount?: number;

  @IsNotEmpty()
  @IsObject({ message: OfferDtoMessages.Location })
  @Type(() => Location)
  public location!: TLocation;
}
