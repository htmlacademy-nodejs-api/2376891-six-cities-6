import 'reflect-metadata';
import { RestApplication, container } from './rest/index.js';
import { Component } from './shared/types/component.enum.js';

async function bootstrap() {
  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
