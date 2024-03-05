import { UserEntity, LoginUserDto } from '../index.js';

export interface IAuthService {
  authenticate(user: UserEntity): Promise<string>;
  verify(dto: LoginUserDto): Promise<UserEntity>;
}
