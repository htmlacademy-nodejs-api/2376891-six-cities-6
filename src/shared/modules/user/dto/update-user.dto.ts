import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { USER_DTO_CONSTRAINT, USER_DTO_MESSAGES } from '../../index.js';
import { EUserAccountType } from '../../../types/index.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(USER_DTO_CONSTRAINT.NAME.MIN, USER_DTO_CONSTRAINT.NAME.MAX)
  public name?: string;

  @IsOptional()
  @IsEmail()
  public email?: string;

  @IsOptional()
  @IsString()
  public avatarUrl?: string;

  @IsOptional()
  @IsString()
  @Length(USER_DTO_CONSTRAINT.PASSWORD.MIN, USER_DTO_CONSTRAINT.PASSWORD.MAX)
  public password?: string;

  @IsOptional()
  @IsEnum(EUserAccountType, {message: USER_DTO_MESSAGES.ACCOUNT_TYPE})
  public accountType?: EUserAccountType;
}
