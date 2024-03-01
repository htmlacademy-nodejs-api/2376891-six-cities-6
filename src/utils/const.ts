export const LOG_FILE_PATH = 'logs/rest.log';

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
