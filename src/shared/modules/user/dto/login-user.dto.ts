import { IsEmail, IsString, Length } from 'class-validator';
import { UserDtoConstraint } from '../../index.js';

export class LoginUserDto {
  @IsEmail()
  public email!: string;

  @IsString()
  @Length(UserDtoConstraint.Password.MIN, UserDtoConstraint.Password.MAX)
  public password!: string;
}
