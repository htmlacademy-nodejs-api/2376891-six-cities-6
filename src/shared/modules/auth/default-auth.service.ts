import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { IAuthService, JWT_ALGORITHM } from './index.js';
import { EComponent } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { LoginUserDto, UserEntity, IUserService } from '../index.js';
import { IConfig, TRestSchema } from '../../libs/config/index.js';
import { SignJWT } from 'jose';
import { TTokenPayload } from './types/token-payload.type.js';
import { UserNotFoundException, UserPasswordIncorrectException } from './errors/index.js';

@injectable()
export class DefaultAuthService implements IAuthService {
  constructor(
    @inject(EComponent.Logger) private readonly logger: ILogger,
    @inject(EComponent.UserService) private readonly userService: IUserService,
    @inject(EComponent.Config) private readonly config: IConfig<TRestSchema>,
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
