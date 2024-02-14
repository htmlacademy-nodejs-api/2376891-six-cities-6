import { EOfferType, ECityName, EGood, EUserAccountType, IUser, TMockOffer } from '../types/index.js';
import { toBoolean } from '../../utils/common.js';

export function createMockOffer(offerData: string): TMockOffer {
  const [
    title, description, date, city, previewImage, images, isPremium, isFavorite, rating, offerType,
    bedrooms, maxAdults, price, goods, name, email, avatarUrl, accountType, comments, latitude, longitude
  ] = offerData.replace('\n', '').split('\t');

  const user: IUser = {
    name,
    email,
    avatarUrl,
    password: '',
    accountType: accountType as EUserAccountType
  };

  const location = {
    latitude: Number(latitude),
    longitude: Number(longitude)
  };

  return {
    title,
    description,
    date: new Date(date),
    city: city as ECityName,
    previewImage,
    images: images.split(';'),
    isPremium: toBoolean(isPremium),
    isFavorite: toBoolean(isFavorite),
    rating: Number.parseFloat(rating),
    offerType: offerType as EOfferType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(';') as EGood[],
    user,
    commentCount: Number.parseInt(comments, 10),
    location
  };
}
