import { inject, injectable } from 'inversify';
import { ICommentService } from './comment-service.interface.js';
import { EComponent, ESortType } from '../../types/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { DEFAULT_COMMENTS_COUNT } from './comment.constant.js';

@injectable()
export class DefaultCommentService implements ICommentService {
  constructor(
    @inject(EComponent.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) { }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    const comments = await this.commentModel
      .find({ offerId })
      .sort({date: ESortType.Down})
      .limit(DEFAULT_COMMENTS_COUNT)
      .populate(['userId'])
      .exec();
    return comments;
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ offerId })
      .exec();

    return result.deletedCount;
  }
}
