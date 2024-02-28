export const LOG_FILE_PATH = 'logs/rest.log';

export const OfferDtoConstraint = {
  Title: { Min: 10, Max: 100 },
  Description: { Min: 20, Max: 1024 },
  Bedrooms: { Min: 1, Max: 8 },
  Adults: { Min: 1, Max: 10 },
  Price: { Min: 100, Max: 100000 },
  Images: 6,
} as const;

export const UserDtoConstraint = {
  Name: { Min: 1, Max: 15 },
  Password: { Min: 6, Max: 12 },
} as const ;

export enum ERatingConstraint {
  Min = 1,
  Max = 5,
}

export enum ECommentsConstraint {
  Min = 0,
  Max = 20,
}

export enum EWeekDay {
  First = 1,
  Last = 7,
}

export enum ECommand {
  HelpCommand = '--help',
  VersionCommand = '--version',
  ImportCommand = '--import',
  GenerateCommand = '--generate',
}

export enum ERetry {
  Count = 5,
  Timeout = 1000,
}
