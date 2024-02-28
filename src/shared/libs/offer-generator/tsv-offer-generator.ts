import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { TMockServerData, ELocation } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { ERatingConstraint, ECommentsConstraint, EWeekDay } from '../../../utils/const.js';
import { OfferDtoConstraint } from '../../../utils/const.js';

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
    const rating = generateRandomValue(ERatingConstraint.Min, ERatingConstraint.Max, 1);
    const offerType = getRandomItem<string>(this.mockData.offerTypes);
    const bedrooms = generateRandomValue(OfferDtoConstraint.Bedrooms.Min, OfferDtoConstraint.Bedrooms.Max);
    const maxAdults = generateRandomValue(OfferDtoConstraint.Adults.Min, OfferDtoConstraint.Adults.Max);
    const price = generateRandomValue(OfferDtoConstraint.Price.Min, OfferDtoConstraint.Price.Max);
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const user = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarUrl = getRandomItem<string>(this.mockData.avatarUrls);
    const accountType = getRandomItem<string>(this.mockData.accountTypes);
    const comments = generateRandomValue(ECommentsConstraint.Min, ECommentsConstraint.Max);
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
