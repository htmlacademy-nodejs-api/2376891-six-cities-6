import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { EComponent } from '../../types/index.js';
import { UserEntity, UserModel, DefaultUserService, UserService } from '../index.js';
import { Controller } from '../../libs/rest/index.js';
import { UserController } from './user.controller.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(EComponent.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(EComponent.UserModel).toConstantValue(UserModel);
  userContainer.bind<Controller>(EComponent.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
