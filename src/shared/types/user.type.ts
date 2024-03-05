export enum EUserAccountType {
  Common = 'обычный',
  Pro = 'pro',
}

export interface IUser {
  name: string;
  email: string;
  avatarUrl?: string;
  password: string;
  accountType: EUserAccountType;
}
