import { Ref } from '@typegoose/typegoose';
import { TLocation } from './location.type.js';
import { ECityName } from './city-name.enum.js';
import { EOfferType } from './housing-type.enum.js';
import { EGood } from './good.enum.js';
import { UserEntity } from '../modules/user/index.js';

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
