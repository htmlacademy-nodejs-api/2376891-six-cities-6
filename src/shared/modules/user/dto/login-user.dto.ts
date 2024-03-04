import { IsEmail, IsString, Length } from 'class-validator';
import { USER_DTO_CONSTRAINT } from '../../index.js';

export class LoginUserDto {
  @IsEmail()
  public email!: string;

  @IsString()
  @Length(USER_DTO_CONSTRAINT.PASSWORD.MIN, USER_DTO_CONSTRAINT.PASSWORD.MAX)
  public password!: string;
}
