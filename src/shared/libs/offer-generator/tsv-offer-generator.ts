import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { TMockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { Rating, Bedrooms, Adults, Price, Comments, WeekDay, CityLocations } from '../../../utils/const.js';

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
    const rating = generateRandomValue(Rating.Min, Rating.Max, 1);
    const housingType = getRandomItem<string>(this.mockData.housingTypes);
    const bedrooms = generateRandomValue(Bedrooms.Min, Bedrooms.Max);
    const maxAdults = generateRandomValue(Adults.Min, Adults.Max);
    const price = generateRandomValue(Price.Min, Price.Max);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const host = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarUrl = getRandomItem<string>(this.mockData.avatarUrls);
    const password = getRandomItem<string>(this.mockData.passwords);
    const accountType = getRandomItem<string>(this.mockData.accountTypes);
    const comments = generateRandomValue(Comments.Min, Comments.Max);
    const cityLocation = CityLocations.find((location) => location.name === city);
    const locationLatitude = cityLocation?.location.latitude;
    const locationLongitude = cityLocation?.location.longitude;

    const createdDate = dayjs()
      .subtract(generateRandomValue(WeekDay.First, WeekDay.Last), 'day')
      .toISOString();

    return [
      title, description, createdDate, city, previewImage, images, isPremium, isFavorite, rating,
      housingType, bedrooms, maxAdults, price, goods, host, email, avatarUrl, password, accountType,
      comments, locationLatitude, locationLongitude
    ].join('\t');
  }
}
