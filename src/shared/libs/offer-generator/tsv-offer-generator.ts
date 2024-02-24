import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { TMockServerData, ELocation } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { ERating, EBedrooms, EAdults, EPrice, EComments, EWeekDay } from '../../../utils/const.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(
    private readonly mockData: TMockServerData
  ) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const cityIndex = generateRandomValue(0, this.mockData.cities.length - 1);
    const city = this.mockData.cities[cityIndex];
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<string>(this.mockData.isPremium);
    const rating = generateRandomValue(ERating.Min, ERating.Max, 1);
    const offerType = getRandomItem<string>(this.mockData.offerTypes);
    const bedrooms = generateRandomValue(EBedrooms.Min, EBedrooms.Max);
    const maxAdults = generateRandomValue(EAdults.Min, EAdults.Max);
    const price = generateRandomValue(EPrice.Min, EPrice.Max);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const user = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarUrl = getRandomItem<string>(this.mockData.avatarUrls);
    const accountType = getRandomItem<string>(this.mockData.accountTypes);
    const comments = generateRandomValue(EComments.Min, EComments.Max);
    const cityLocation = Object.values(ELocation)[cityIndex];
    const locationLatitude = cityLocation?.latitude;
    const locationLongitude = cityLocation?.longitude;

    const createdDate = dayjs()
      .subtract(generateRandomValue(EWeekDay.First, EWeekDay.Last), 'day')
      .toISOString();

    return [
      title, description, createdDate, city, previewImage, images, isPremium,
      rating, offerType, bedrooms, maxAdults, price, goods, user, email, avatarUrl,
      accountType, comments, locationLatitude, locationLongitude
    ].join('\t');
  }
}
