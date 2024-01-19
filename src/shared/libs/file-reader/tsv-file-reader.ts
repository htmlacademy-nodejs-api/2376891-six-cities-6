import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { TOffer, HousingType, CityName, Good, HostAccountType } from '../../types/index.js';
import { toBoolean } from '../../../utils/common.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly fileName: string
  ) { }

  public read(): void {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf-8' });
  }

  public toArray(): TOffer[] {
    if (!this.rawData) {
      throw new Error('File was not read.');
    }
    console.log();

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, date, city, previewImage, images, isPremium, isFavorite, rating, housingType,
        bedrooms, maxAdults, price, goods, name, email, avatarUrl, password, accountType, comments, latitude, longitude
      ]) => ({
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
        host: {name, email, avatarUrl, password, accountType: accountType as HostAccountType},
        comments: Number.parseInt(comments, 10),
        location: {latitude: Number(latitude), longitude: Number(longitude)},
      }));
  }
}
