import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { AuthService } from './auth-service.interface.js';
import { EComponent } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { LoginUserDto, UserEntity, UserService } from '../index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { SignJWT } from 'jose';
import { JWT_ALGORITHM } from './auth.constant.js';
import { TTokenPayload } from './types/TokenPayload.js';
import { UserNotFoundException, UserPasswordIncorrectException } from './errors/index.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(EComponent.Logger) private readonly logger: Logger,
    @inject(EComponent.UserService) private readonly userService: UserService,
    @inject(EComponent.Config) private readonly config: Config<RestSchema>,
  ) { }

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const jwtExpired = this.config.get('JWT_EXPIRED');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TTokenPayload = {
      id: user.id,
      email: user.email,
    };

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(jwtExpired)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.findUnique({ email: dto.email });
    if (!user) {
      this.logger.warn(`User with ${dto.email} not found.`);
      throw new UserNotFoundException();
    }

    if (!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
