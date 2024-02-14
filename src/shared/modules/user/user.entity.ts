import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
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
  @prop({required: true, minlength: [1, 'Min length for name is 1'], maxlength: [15, 'Max length for name is 15'], default: ''})
  public name!: string;

  @prop({required: true, unique: true, match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect']})
  public email!: string;

  @prop({required: false, default: ''})
  public avatarUrl!: string | undefined;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true, enum: [`${EUserAccountType.Common}`, `${EUserAccountType.Pro}`] })
  public accountType!: string;

  constructor(userData: IUser, salt: string) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.password = createSHA256(userData.password, salt);
    this.accountType = userData.accountType;
  }
}

export const UserModel = getModelForClass(UserEntity);
