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
      Пример:
        main.cli.ts --<command> [--arguments]
      Команды:
        --version:                   # выводит в консоль номер версии приложения
        --help:                      # печатает информацию о доступных командах
        --import <path>:             # импортирует данные из TSV-файла по указанному пути
        --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `));
  }
}
