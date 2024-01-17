import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, HousingType, CityName, Good, Host, Location } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly fileName: string
  ) { }

  private getHost([name, email, avatarUrl, password, isPro]: string[]): Host {
    return ({
      name,
      email,
      avatarUrl,
      password,
      isPro: Boolean(isPro),
    });
  }

  private getLocation([latitude, longitude]: string[]): Location {
    return ({
      latitude: Number.parseInt(latitude, 10),
      longitude: Number.parseInt(longitude, 10),
    });
  }

  public read(): void {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read.');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, date, city, previewImage, images, isPremium, isFavorite, rating,
        housingType, bedrooms, maxAdults, price, goods, host, comments, location]) => ({
        title,
        description,
        date: new Date(date),
        city: CityName[city as keyof typeof CityName],
        previewImage,
        images: images.split(';'),
        isPremium: Boolean(isPremium),
        isFavorite: Boolean(isFavorite),
        rating: Number.parseFloat(rating),
        housingType: HousingType,
        bedrooms: Number.parseInt(bedrooms, 10),
        maxAdults: Number.parseInt(maxAdults, 10),
        price: Number.parseInt(price, 10),
        goods: goods.split(';') as Good[],
        host: this.getHost(host.split(';')),
        comments: Number.parseInt(comments, 10),
        location: this.getLocation(location.split(';')),
      }));
  }
}
