import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';
import { ERating } from '../../../../utils/const.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(5, 1024, { message: 'min is 5, max is 1024 '})
  public text!: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId!: string;

  @IsInt({ message: CreateCommentMessages.rating.invalidFormat })
  @Min(ERating.Min)
  @Max(ERating.Max)
  public rating!: number;

  @IsMongoId({ message: CreateCommentMessages.userId.invalidFormat })
  public userId!: string;
}
