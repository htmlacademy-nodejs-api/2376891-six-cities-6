import { IsEmail, IsString, Length } from 'class-validator';
import { EPasswordLength } from '../../../../utils/const.js';
import { CreateLoginUserMessage } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, {message: CreateLoginUserMessage.email.invalidFormat})
  public email!: string;

  @IsString({ message: CreateLoginUserMessage.password.invalidFormat })
  @Length(EPasswordLength.Min, EPasswordLength.Max, {message: CreateLoginUserMessage.password.lengthField})
  public password!: string;
}
