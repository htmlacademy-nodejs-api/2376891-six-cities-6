import { ICommand } from './command.interface.js';
import { Command } from '../../utils/const.js';
import chalk from 'chalk';

export class HelpCommand implements ICommand {
  public get name(): string {
    return Command.HelpCommand;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(chalk.yellowBright(`
      Программа для подготовки данных для REST API сервера.
      Синтаксис:
        скрипт --<command> [--arguments]
      Примеры:
        npm run ts ./src/main.cli.ts
        npm run ts ./src/main.cli.ts -- --version
        npm run ts ./src/main.cli.ts -- --import ./mocks/mock-data.tsv
      Команды:
        --version:                   # выводит в консоль номер версии приложения из файла package.json
        --help:                      # печатает информацию о доступных командах. Команда по умолчанию
        --import <path>:             # импортирует данные из TSV-файла по указанному пути
        --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `));
  }
}
