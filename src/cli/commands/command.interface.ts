export interface ICommand {
  get name(): string;
  execute(...parameters: string[]): Promise<void> | void;
}
