import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';

export class UpdateFavoritesDto {
  @IsOptional()
  @IsMongoId()
  public offerId?: string;

  @IsOptional()
  @IsBoolean()
  public isFavorite?: boolean;
}
