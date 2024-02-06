import { TOffer, HousingType, CityName, Good, UserAccountType, IUser } from '../types/index.js';
import { toBoolean } from '../../utils/common.js';

export function createOffer(offerData: string): TOffer {
  const [
    title, description, date, city, previewImage, images, isPremium, isFavorite, rating, housingType,
    bedrooms, maxAdults, price, goods, name, email, avatarUrl, password, accountType, comments, latitude, longitude
  ] = offerData.replace('\n', '').split('\t');

  const user: IUser = {
    name,
    email,
    avatarUrl,
    password,
    accountType: accountType as UserAccountType
  };

  const location = {
    latitude: Number(latitude),
    longitude: Number(longitude)
  };

  return {
    title,
    description,
    date: new Date(date),
    city: city as CityName,
    previewImage,
    images: images.split(';'),
    isPremium: toBoolean(isPremium),
    isFavorite: toBoolean(isFavorite),
    rating: Number.parseFloat(rating),
    housingType: housingType as HousingType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(';') as Good[],
    user,
    comments: Number.parseInt(comments, 10),
    location
  };
}
