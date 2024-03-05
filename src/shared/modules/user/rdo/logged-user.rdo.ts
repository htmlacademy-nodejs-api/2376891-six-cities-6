import { Expose } from 'class-transformer';
import { EUserAccountType } from '../../../types/index.js';

export class LoggedUserRdo {
  @Expose()
  public token!: string;

  @Expose()
  public email!: string;

  @Expose()
  public name!: string;

  @Expose()
  public avatarUrl!: string;

  @Expose()
  public accountType!: EUserAccountType;
}
