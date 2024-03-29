import 'reflect-metadata';
import { RestApplication, getRestApplicationContainer } from './rest/index.js';
import { EComponent } from './shared/types/index.js';

async function bootstrap() {
  const appContainer = getRestApplicationContainer();

  const application = appContainer.get<RestApplication>(EComponent.RestApplication);
  await application.init();
}

bootstrap();
