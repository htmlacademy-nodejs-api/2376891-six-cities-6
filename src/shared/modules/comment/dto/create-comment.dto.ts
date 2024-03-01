import { IsInt, IsMongoId, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';
import { COMMENT_DTO_CONSTRAINT } from '../../index.js';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @Length(COMMENT_DTO_CONSTRAINT.TEXT.MIN, COMMENT_DTO_CONSTRAINT.TEXT.MAX)
  public text!: string;

  @IsNotEmpty()
  @IsMongoId()
  public offerId!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(COMMENT_DTO_CONSTRAINT.RATING.MIN)
  @Max(COMMENT_DTO_CONSTRAINT.RATING.MAX)
  public rating!: number;

  public userId!: string;
}
