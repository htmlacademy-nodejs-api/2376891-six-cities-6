import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsLatitude, IsLongitude, IsMongoId, IsObject, IsOptional, IsUrl, Length, Matches, Max, Min } from 'class-validator';
import { EAdults, EBedrooms, EDescriptionConstraint, EPrice, ETitleConstraint, IMAGE_COUNT } from '../../../../utils/const.js';
import { ECityName, EOfferType, EGood, TLocation } from '../../../types/index.js';
import { CreateUpdateOfferMessage } from './update-offer.messages.js';
import { Type } from 'class-transformer';

class Location {
  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}

export class UpdateOfferDto {
  @IsOptional()
  @Length(ETitleConstraint.Min, ETitleConstraint.Max, { message: CreateUpdateOfferMessage.title.minLength })
  public title?: string;

  @IsOptional()
  @Length(EDescriptionConstraint.Min, EDescriptionConstraint.Max, { message: CreateUpdateOfferMessage.description.minLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: CreateUpdateOfferMessage.date.invalidFormat})
  public date?: Date;

  @IsOptional()
  @IsEnum(ECityName, {message: CreateUpdateOfferMessage.city.invalid})
  public city?: ECityName;

  @IsOptional()
  @IsUrl({ message: CreateUpdateOfferMessage.previewImage.invalid })
  @Matches(/\.(jpg|png)(\?.*)?$/i)
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferMessage.images.invalidFormat })
  @ArrayMinSize(IMAGE_COUNT, {message: CreateUpdateOfferMessage.images.invalid})
  @ArrayMaxSize(IMAGE_COUNT, {message: CreateUpdateOfferMessage.images.invalid})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: CreateUpdateOfferMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(EOfferType, {message: CreateUpdateOfferMessage.offerType.invalid})
  public offerType?: EOfferType;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.bedrooms.invalidFormat })
  @Min(EBedrooms.Min)
  @Max(EBedrooms.Max)
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.maxAdults.invalidFormat })
  @Min(EAdults.Min)
  @Max(EAdults.Max)
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferMessage.price.invalidFormat })
  @Min(EPrice.Min, { message: CreateUpdateOfferMessage.price.minValue })
  @Max(EPrice.Max, {message: CreateUpdateOfferMessage.price.maxValue})
  public price?: number;

  @IsOptional()
  @IsArray({message: CreateUpdateOfferMessage.goods.invalidFormat})
  @IsEnum(EGood, { each: true, message: CreateUpdateOfferMessage.goods.invalid })
  public goods?: EGood[];

  @IsOptional()
  @IsMongoId({message: CreateUpdateOfferMessage.userId.invalidId})
  public userId?: string;

  @IsOptional()
  @IsInt({message: CreateUpdateOfferMessage.commentCount.invalidFormat})
  public commentCount?: number;

  @IsOptional()
  @IsObject({ message: CreateUpdateOfferMessage.location.invalid })
  @Type(() => Location)
  public location?: TLocation;
}
