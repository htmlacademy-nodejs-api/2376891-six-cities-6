import { Ref } from '@typegoose/typegoose';
import { IsArray, IsOptional } from 'class-validator';
import { OfferEntity } from '../../index.js';

export class UpdateFavoritesDto {
  @IsOptional()
  @IsArray()
  public favorites?: Ref<OfferEntity>[];
}
