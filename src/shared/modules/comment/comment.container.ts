import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { EComponent } from '../../types/index.js';
import { CommentEntity, CommentModel, DefaultCommentService, CommentService } from '../index.js';
import { Controller } from '../../libs/rest/index.js';
import CommentController from './comment.controller.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(EComponent.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(EComponent.CommentModel)
    .toConstantValue(CommentModel);
  commentContainer.bind<Controller>(EComponent.CommentController).to(CommentController).inSingletonScope();

  return commentContainer;
}
