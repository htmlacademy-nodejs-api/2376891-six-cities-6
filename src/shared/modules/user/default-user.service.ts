import { IUserService } from './user-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { inject, injectable } from 'inversify';
import { EComponent, TUniqueQuery } from '../../types/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { DEFAULT_AVATAR_FILE_NAME } from './user.constant.js';

export type TFavoriteIds = string[];

@injectable()
export class DefaultUserService implements IUserService {
  constructor(
    @inject(EComponent.Logger) private readonly logger: ILogger,
    @inject(EComponent.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const avatarUrl = dto.avatarUrl ? dto.avatarUrl : DEFAULT_AVATAR_FILE_NAME;
    const user = new UserEntity({...dto, avatarUrl}, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findUnique(data: TUniqueQuery): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne(data).populate(['favorites']).exec();
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findUnique({email: dto.email});

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, { new: true })
      .populate(['favorites'])
      .exec();
  }
}
