import { ICommand } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Command } from '../../utils/const.js';
import chalk from 'chalk';

export class ImportCommand implements ICommand {
  public get name(): string {
    return Command.ImportCommand;
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;

    if (!filename) {
      throw new Error('Error');
    }

    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(`Details: ${err.message}`));
    }
  }
}
