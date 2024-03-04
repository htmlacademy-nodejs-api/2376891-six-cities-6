import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserDtoConstraint, UserDtoMessages } from '../../index.js';
import { EUserAccountType } from '../../../types/index.js';

export class CreateUserDto {
  @IsString()
  @Length(UserDtoConstraint.Name.MIN, UserDtoConstraint.Name.MAX)
  public name!: string;

  @IsEmail()
  public email!: string;

  @IsOptional()
  @IsString()
  public avatarUrl?: string;

  @IsString()
  @Length(UserDtoConstraint.Password.MIN, UserDtoConstraint.Password.MAX)
  public password!: string;

  @IsEnum(EUserAccountType, {message: UserDtoMessages.AccountType})
  public accountType!: EUserAccountType;
}
