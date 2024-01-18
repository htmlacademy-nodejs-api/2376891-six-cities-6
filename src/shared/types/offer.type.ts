import { Host } from './host.type.js';
import { Location } from './location.type.js';
import { CityName } from './city-name.enum.js';
import { HousingType } from './housing-type.enum.js';
import { Good } from './good.enum.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: CityName;
  previewImage: string;
  images: string[] | string;
  isPremium: string;
  isFavorite: string;
  rating: number;
  housingType: HousingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Good[];
  host: Host;
  comments: number;
  location: Location;
}
