import { IsArray, IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserDtoConstraint, UserDtoMessages } from '../../index.js';
import { EUserAccountType } from '../../../types/index.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(UserDtoConstraint.Name.MIN, UserDtoConstraint.Name.MAX)
  public name?: string;

  @IsOptional()
  @IsEmail()
  public email?: string;

  @IsOptional()
  @IsString()
  public avatarUrl?: string;

  @IsOptional()
  @IsString()
  @Length(UserDtoConstraint.Password.MIN, UserDtoConstraint.Password.MAX)
  public password?: string;

  @IsOptional()
  @IsEnum(EUserAccountType, {message: UserDtoMessages.AccountType})
  public accountType?: EUserAccountType;

  @IsOptional()
  @IsArray()
  public favorites?: string[];
}
