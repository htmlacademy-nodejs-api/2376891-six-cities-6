// import { Ref } from '@typegoose/typegoose';
// import { OfferEntity } from '../modules/index.js';

export enum EUserAccountType {
  Common = 'regular',
  Pro = 'pro',
}

export interface IUser {
  name: string;
  email: string;
  avatarUrl?: string;
  password: string;
  accountType: EUserAccountType;
  // favorites: Ref<OfferEntity>[];
}
