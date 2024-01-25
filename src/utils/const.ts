import { CityName } from '../shared/types/index.js';

export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const MIN_BEDROOMS = 1;
export const MAX_BEDROOMS = 8;
export const MIN_ADULTS = 1;
export const MAX_ADULTS = 10;
export const MIN_PRICE = 100;
export const MAX_PRICE = 100000;
export const MIN_COMMENTS = 0;
export const MAX_COMMENTS = 20;

export const FIRST_WEEK_DAY = 1;
export const LAST_WEEK_DAY = 7;

export enum Command {
  HelpCommand = '--help',
  VersionCommand = '--version',
  ImportCommand = '--import',
  GenerateCommand = '--generate',
}

export const CityLocations = [
  {
    name: CityName.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
    }
  },
  {
    name: CityName.Cologne,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
    }
  },
  {
    name: CityName.Brussels,
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
    }
  },
  {
    name: CityName.Amsterdam,
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
    }
  },
  {
    name: CityName.Hamburg,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
    }
  },
  {
    name: CityName.Dusseldorf,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
    }
  },
];
