import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { TMockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import {
  MIN_RATING, MAX_RATING, MIN_BEDROOMS, MAX_BEDROOMS, MIN_ADULTS, MAX_ADULTS, MIN_PRICE, MAX_PRICE, MIN_COMMENTS,
  MAX_COMMENTS, FIRST_WEEK_DAY, LAST_WEEK_DAY, CityLocations
} from '../../../utils/const.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: TMockServerData
  ) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<string>(this.mockData.isPremium);
    const isFavorite = getRandomItem<string>(this.mockData.isFavorite);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    const housingType = getRandomItem<string>(this.mockData.housingTypes);
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS);
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const host = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarUrl = getRandomItem<string>(this.mockData.avatarUrls);
    const password = getRandomItem<string>(this.mockData.passwords);
    const accountType = getRandomItem<string>(this.mockData.accountTypes);
    const comments = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS);
    const cityLocation = CityLocations.find((location) => location.name === city);
    const locationLatitude = cityLocation?.location.latitude;
    const locationLongitude = cityLocation?.location.longitude;

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, createdDate, city, previewImage, images, isPremium, isFavorite, rating,
      housingType, bedrooms, maxAdults, price, goods, host, email, avatarUrl, password, accountType,
      comments, locationLatitude, locationLongitude
    ].join('\t');
  }
}
