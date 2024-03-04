import 'reflect-metadata';
import { Container } from 'inversify';
import { ILogger, PinoLogger } from '../shared/libs/logger/index.js';
import { RestApplication } from './index.js';
import { IConfig, RestConfig, TRestSchema } from '../shared/libs/config/index.js';
import { EComponent } from '../shared/types/index.js';
import { IDatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import { createUserContainer, createOfferContainer, createCommentContainer } from '../shared/modules/index.js';
import { AppExceptionFilter, IExceptionFilter, ValidationExceptionFilter, HttpErrorExceptionFilter } from '../shared/libs/rest/index.js';
import { createAuthContainer } from '../shared/modules/auth/index.js';
import { PathTransformer } from '../shared/libs/rest/transform/path-transformer.js';

function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(EComponent.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<ILogger>(EComponent.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<IConfig<TRestSchema>>(EComponent.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<IDatabaseClient>(EComponent.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<IExceptionFilter>(EComponent.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<IExceptionFilter>(EComponent.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<IExceptionFilter>(EComponent.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<PathTransformer>(EComponent.PathTransformer).to(PathTransformer).inSingletonScope();

  return restApplicationContainer;
}

export const getRestApplicationContainer = () => Container.merge(
  createRestApplicationContainer(),
  createUserContainer(),
  createOfferContainer(),
  createCommentContainer(),
  createAuthContainer(),
);
