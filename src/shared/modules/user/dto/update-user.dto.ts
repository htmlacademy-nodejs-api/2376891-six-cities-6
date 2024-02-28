import { IsEmail, IsEnum, IsOptional, IsString, IsUrl, Length, Matches } from 'class-validator';
import { UserDtoMessages } from './user-dto.messages.js';
import { UserDtoConstraint } from '../../../../utils/const.js';
import { EUserAccountType } from '../../../types/index.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: UserDtoMessages.name.invalidFormat })
  @Length(UserDtoConstraint.Name.Min, UserDtoConstraint.Name.Max, { message: UserDtoMessages.name.lengthField })
  public name?: string;

  @IsOptional()
  @IsEmail({}, {message: UserDtoMessages.email.invalidFormat})
  public email?: string;

  @IsOptional()
  @IsUrl({ message: UserDtoMessages.avatarUrl.invalidFormat })
  @Matches(/\.(jpg|png)(\?.*)?$/i)
  public avatarUrl?: string | undefined;

  @IsOptional()
  @IsString({ message: UserDtoMessages.password.invalidFormat })
  @Length(UserDtoConstraint.Password.Min, UserDtoConstraint.Password.Max, {message: UserDtoMessages.password.lengthField})
  public password?: string;

  @IsOptional()
  @IsEnum(EUserAccountType, {message: UserDtoMessages.accountType.invalid})
  public accountType?: EUserAccountType;
  // public favorites?: string[];
}
