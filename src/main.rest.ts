import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication, createRestApplicationContainer } from './rest/index.js';
import { EComponent } from './shared/types/component.enum.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
  );

  const application = appContainer.get<RestApplication>(EComponent.RestApplication);
  await application.init();
}

bootstrap();
