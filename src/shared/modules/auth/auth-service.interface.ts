import { UserEntity, LoginUserDto } from '../index.js';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>;
  verify(dto: LoginUserDto): Promise<UserEntity>;
}
