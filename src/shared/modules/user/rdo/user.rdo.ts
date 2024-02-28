import { Expose } from 'class-transformer';
import { EUserAccountType } from '../../../types/user.type.js';

export class UserRdo {
  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatarUrl?: string;

  @Expose()
  public accountType!: EUserAccountType;

  // @Expose()
  // public favorites!: string[];
}
