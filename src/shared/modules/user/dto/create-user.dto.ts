import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { USER_DTO_CONSTRAINT, USER_DTO_MESSAGES } from '../../index.js';
import { EUserAccountType } from '../../../types/user.type.js';

export class CreateUserDto {
  @IsString()
  @Length(USER_DTO_CONSTRAINT.NAME.MIN, USER_DTO_CONSTRAINT.NAME.MAX)
  public name!: string;

  @IsEmail()
  public email!: string;

  // @Matches(/\.(jpg|png)(\?.*)?$/i)
  // public avatarUrl?: string;

  @IsString()
  @Length(USER_DTO_CONSTRAINT.PASSWORD.MIN, USER_DTO_CONSTRAINT.PASSWORD.MAX)
  public password!: string;

  @IsEnum(EUserAccountType, {message: USER_DTO_MESSAGES.ACCOUNT_TYPE})
  public accountType!: EUserAccountType;
}
