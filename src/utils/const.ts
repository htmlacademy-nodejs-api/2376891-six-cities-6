export const LOG_FILE_PATH = 'logs/rest.log';

export enum ERating {
  Min = 1,
  Max = 5,
}

export enum EBedrooms {
  Min = 1,
  Max = 8,
}

export enum EAdults {
  Min = 1,
  Max = 10,
}

export enum EPrice {
  Min = 100,
  Max = 100000,
}

export enum EComments {
  Min = 0,
  Max = 20,
}

export enum EPasswordLength {
  Min = 6,
  Max = 12,
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
