import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { EComponent } from '../../types/index.js';
import { UserEntity, UserModel, DefaultUserService, IUserService } from '../index.js';
import { IController } from '../../libs/rest/index.js';
import { UserController } from './user.controller.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<IUserService>(EComponent.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(EComponent.UserModel).toConstantValue(UserModel);
  userContainer.bind<IController>(EComponent.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
