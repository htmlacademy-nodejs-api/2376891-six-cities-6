export enum EUserAccountType {
  Common = 'regular',
  Pro = 'pro',
}

export interface IUser {
  name: string;
  email: string;
  avatarUrl?: string;
  password: string;
  accountType: string;
  favorites: string[];
}
