import { IsArray, IsEmail, IsEnum, IsString, IsUrl, Length, Matches, MinLength } from 'class-validator';
import { EPasswordLength, EUserNameConstraint } from '../../../../utils/const.js';
import { CreateUserMessages } from './create-user.messages.js';
import { EUserAccountType } from '../../../types/user.type.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(EUserNameConstraint.Min, EUserNameConstraint.Max, { message: CreateUserMessages.name.lengthField })
  public name!: string;

  @IsEmail({}, {message: CreateUserMessages.email.invalidFormat})
  public email!: string;

  @IsUrl({ message: CreateUserMessages.avatarUrl.invalidFormat })
  @Matches(/\.(jpg|png)(\?.*)?$/i)
  public avatarUrl?: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(EPasswordLength.Min, EPasswordLength.Max, {message: CreateUserMessages.password.lengthField})
  public password!: string;

  @IsEnum(EUserAccountType, {message: CreateUserMessages.accountType.invalid})
  public accountType!: EUserAccountType;

  @IsArray({message: CreateUserMessages.favorites.invalidFormat})
  public favorites!: string[];
}
