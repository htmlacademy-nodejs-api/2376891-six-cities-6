import { IsInt, IsMongoId, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';
import { CommentDtoConstraint } from '../../index.js';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @Length(CommentDtoConstraint.Text.MIN, CommentDtoConstraint.Text.MAX)
  public text!: string;

  @IsNotEmpty()
  @IsMongoId()
  public offerId!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(CommentDtoConstraint.Rating.MIN)
  @Max(CommentDtoConstraint.Rating.MAX)
  public rating!: number;

  public userId!: string;
}
