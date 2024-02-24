import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { EComponent } from '../../types/index.js';
import { CommentEntity, CommentModel, DefaultCommentService, CommentService } from '../index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(EComponent.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(EComponent.CommentModel)
    .toConstantValue(CommentModel);

  return commentContainer;
}
