import { Ref } from '@typegoose/typegoose';
import { TLocation, ECityName, EOfferType, EGood } from './index.js';
import { UserEntity } from '../modules/index.js';

export type TOffer = {
  title: string;
  description: string;
  date: Date;
  city: ECityName;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  offerType: EOfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: EGood[];
  userId: Ref<UserEntity>;
  commentCount: number;
  location: TLocation;
}
