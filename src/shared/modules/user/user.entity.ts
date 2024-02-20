import { defaultClasses, prop, modelOptions } from '@typegoose/typegoose';
import { IUser, EUserAccountType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements IUser {
  @prop({required: true})
  public name!: string;

  @prop({required: true, unique: true})
  public email!: string;

  @prop({required: false, default: ''})
  public avatarUrl!: string | undefined;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true, type: () => String })
  public accountType!: string;

  @prop({ required: false })
  public favorites!: string[];

  constructor(userData: IUser, salt: string) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.password = createSHA256(userData.password, salt);
    this.accountType = userData.accountType;
  }
}
