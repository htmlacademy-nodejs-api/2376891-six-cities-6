import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentService } from './comment-service.interface.js';
import { EComponent } from '../../types/component.enum.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { DefaultCommentService } from './default-comment.service.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(EComponent.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(EComponent.CommentModel)
    .toConstantValue(CommentModel);

  return commentContainer;
}
