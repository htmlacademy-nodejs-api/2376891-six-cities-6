import { TLocation } from './location.type.js';
import { ECityName } from './city-name.enum.js';
import { EOfferType } from './housing-type.enum.js';
import { EGood } from './good.enum.js';
import { IUser } from './user.type.js';

export type TMockOffer = {
  title: string;
  description: string;
  date: Date;
  city: ECityName;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  offerType: EOfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: EGood[];
  user: IUser;
  commentCount: number;
  location: TLocation;
}

