export enum HostAccountType {
  Common = 'обычный',
  Pro = 'pro',
}

export interface IHost {
  name: string;
  email: string;
  avatarUrl?: string;
  password: string;
  accountType: HostAccountType;
}
