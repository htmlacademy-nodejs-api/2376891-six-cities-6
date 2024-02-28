import { IsEmail, IsString, Length } from 'class-validator';
import { UserDtoMessages } from './user-dto.messages.js';
import { UserDtoConstraint } from '../../../../utils/const.js';

export class LoginUserDto {
  @IsEmail({}, {message: UserDtoMessages.email.invalidFormat})
  public email!: string;

  @IsString({ message: UserDtoMessages.password.invalidFormat })
  @Length(UserDtoConstraint.Password.Min, UserDtoConstraint.Password.Max, {message: UserDtoMessages.password.lengthField})
  public password!: string;
}
