import chalk from 'chalk';
import { error } from 'console';
import { ICommand } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createMockOffer, getErrorMessage, getMongoURI, generatePassword } from '../../shared/helpers/index.js';
import { ECommand } from '../../utils/const.js';
import { OfferDtoConstraint, UserDtoConstraint, OfferModel, OfferService, DefaultOfferService, IUserService, DefaultUserService, UserModel } from '../../shared/modules/index.js';
import { IDatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { ILogger, ConsoleLogger } from '../../shared/libs/logger/index.js';
import { TMockOffer } from '../../shared/types/index.js';
import { IConfig, RestConfig, TRestSchema } from '../../shared/libs/config/index.js';

export class ImportCommand implements ICommand {
  private readonly config: IConfig<TRestSchema>;
  private userService: IUserService;
  private offerService: OfferService;
  private databaseClient: IDatabaseClient;
  private logger: ILogger;
  private salt!: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.config = new RestConfig(this.logger);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createMockOffer(line);
    await this.saveOffer(offer);
    resolve();
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: TMockOffer) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: generatePassword(UserDtoConstraint.Password.MIN, UserDtoConstraint.Password.MAX),
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      offerType: offer.offerType,
      bedrooms: offer.bedrooms,
      maxAdults: offer.maxAdults,
      rating: OfferDtoConstraint.Rating.MIN,
      price: offer.price,
      goods: offer.goods,
      userId: user.id,
      commentCount: offer.commentCount,
      location: offer.location,
    });
  }

  public get name(): string {
    return ECommand.ImportCommand;
  }

  public async execute(
    filename: string,
    login: string = this.config.get('DB_USER'),
    password: string = this.config.get('DB_PASSWORD'),
    host: string = this.config.get('DB_HOST'),
    port: string = this.config.get('DB_PORT'),
    dbname: string = this.config.get('DB_NAME'),
    salt: string = this.config.get('SALT'),
  ): Promise<void> {

    const uri = getMongoURI(
      login,
      password,
      host,
      port,
      dbname,
    );

    if (salt) {
      this.salt = salt;
    }

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err) {
      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(getErrorMessage(error)));
    }
  }
}
