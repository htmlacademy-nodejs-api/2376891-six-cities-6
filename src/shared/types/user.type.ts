export enum UserAccountType {
  Common = 'regular',
  Pro = 'pro',
}

export interface IUser {
  name: string;
  email: string;
  avatarUrl?: string;
  accountType: UserAccountType;
}
