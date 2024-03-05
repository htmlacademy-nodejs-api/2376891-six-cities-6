import { inject, injectable } from 'inversify';
import { BaseController, HttpError, EHttpMethod, PrivateRouteMiddleware, UploadFileMiddleware,
  ValidateDtoMiddleware, AnonymRouteMiddleware } from '../../libs/rest/index.js';
import { EComponent } from '../../types/index.js';
import { TCreateUserRequest } from './create-user-request.type.js';
import { Request, Response } from 'express';
import { ILogger } from '../../libs/logger/index.js';
import { IUserService } from './user-service.interface.js';
import { IConfig, TRestSchema } from '../../libs/config/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../helpers/common.js';
import { UserRdo } from './rdo/user.rdo.js';
import { TLoginUserRequest } from './login-user-request.type.js';
import { CreateUserDto, UploadUserAvatarRdo } from '../index.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { IAuthService } from '../auth/index.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(EComponent.Logger) protected readonly logger: ILogger,
    @inject(EComponent.UserService) private readonly userService: IUserService,
    @inject(EComponent.Config) private readonly configService: IConfig<TRestSchema>,
    @inject(EComponent.AuthService) private readonly authService: IAuthService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');

    this.addRoute({
      path: '/register',
      method: EHttpMethod.Post,
      handler: this.create,
      middlewares: [
        new AnonymRouteMiddleware(),
        new ValidateDtoMiddleware(CreateUserDto)
      ]
    });
    this.addRoute({
      path: '/login',
      method: EHttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({
      path: '/avatar',
      method: EHttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY_PATH'), 'avatar'),
      ]
    });
    this.addRoute({
      path: '/login',
      method: EHttpMethod.Get,
      handler: this.checkAuthenticate,
      middlewares: [new PrivateRouteMiddleware()]
    });
  }

  public async create(
    {body}: TCreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findUnique({email: body.email});

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login({ body }: TLoginUserRequest, res: Response,): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);
    this.ok(res, Object.assign(responseData, { token }));
  }

  public async uploadAvatar({ params, file }: Request, res: Response) {
    const { userId } = params;
    const uploadFile = { avatarUrl: file?.filename };
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarRdo, {filePath: uploadFile.avatarUrl}));
  }

  public async checkAuthenticate({ tokenPayload: { email } }: Request, res: Response) {
    const foundedUser = await this.userService.findUnique({ email });

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }
}
