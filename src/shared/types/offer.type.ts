import { Ref } from '@typegoose/typegoose';
import { TLocation } from './location.type.js';
import { CityName } from './city-name.enum.js';
import { HousingType } from './housing-type.enum.js';
import { Good } from './good.enum.js';
import { UserEntity } from '../modules/user/index.js';

export type TOffer = {
  title: string;
  description: string;
  date: Date;
  city: CityName;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Good[];
  userId: Ref<UserEntity>;
  comments: number;
  location: TLocation;
}
