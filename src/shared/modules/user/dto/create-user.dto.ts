import { IsEmail, IsEnum, IsString, IsUrl, Length, Matches } from 'class-validator';
import { UserDtoConstraint } from '../../../../utils/const.js';
import { UserDtoMessages } from './user-dto.messages.js';
import { EUserAccountType } from '../../../types/user.type.js';

export class CreateUserDto {
  @IsString({ message: UserDtoMessages.name.invalidFormat })
  @Length(UserDtoConstraint.Name.Min, UserDtoConstraint.Name.Max, { message: UserDtoMessages.name.lengthField })
  public name!: string;

  @IsEmail({}, {message: UserDtoMessages.email.invalidFormat})
  public email!: string;

  @IsUrl({ message: UserDtoMessages.avatarUrl.invalidFormat })
  @Matches(/\.(jpg|png)(\?.*)?$/i)
  public avatarUrl?: string;

  @IsString({ message: UserDtoMessages.password.invalidFormat })
  @Length(UserDtoConstraint.Password.Min, UserDtoConstraint.Password.Max, {message: UserDtoMessages.password.lengthField})
  public password!: string;

  @IsEnum(EUserAccountType, {message: UserDtoMessages.accountType.invalid})
  public accountType!: EUserAccountType;

  // @IsArray({message: CreateUserMessages.favorites.invalidFormat})
  // public favorites!: string[];
}
