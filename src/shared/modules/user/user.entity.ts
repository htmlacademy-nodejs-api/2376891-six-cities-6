import { defaultClasses, prop, modelOptions, Ref } from '@typegoose/typegoose';
import { EUserAccountType, IUser } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import { OfferEntity } from '../index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps {
  @prop({required: true})
  public name!: string;

  @prop({required: true, unique: true})
  public email!: string;

  @prop({required: false})
  public avatarUrl?: string | undefined;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true, type: () => String })
  public accountType!: EUserAccountType;

  @prop({ required: true, ref: () => OfferEntity })
  public favorites!: Ref<OfferEntity>[];

  constructor(userData: IUser, salt: string) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.password = createSHA256(userData.password, salt);
    this.accountType = userData.accountType;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}
