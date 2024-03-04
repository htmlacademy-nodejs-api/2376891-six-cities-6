import { Container } from 'inversify';
import { IAuthService, DefaultAuthService, AuthExceptionFilter } from './index.js';
import { EComponent } from '../../types/index.js';
import { IExceptionFilter } from '../../libs/rest/index.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<IAuthService>(EComponent.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<IExceptionFilter>(EComponent.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
