import chalk from 'chalk';
import { error } from 'console';
import { ICommand } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { createMockOffer, getErrorMessage, getMongoURI, generatePassword } from '../../shared/helpers/index.js';
import { ECommand, EPasswordLength } from '../../utils/const.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { OfferModel, OfferService, DefaultOfferService, DefaultUserService, UserModel } from '../../shared/modules/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { TMockOffer } from '../../shared/types/index.js';

export class ImportCommand implements ICommand {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt!: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
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
      password: generatePassword(EPasswordLength.Min, EPasswordLength.Max),
    }, this.salt);

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      previewImage: offer.previewImage,
      images: offer.images,
      isPremium: offer.isPremium,
      rating: offer.rating,
      offerType: offer.offerType,
      bedrooms: offer.bedrooms,
      maxAdults: offer.maxAdults,
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
    login: string | undefined = process.env.DB_USER,
    password: string | undefined = process.env.DB_PASSWORD,
    host: string | undefined = process.env.DB_HOST,
    port: string | undefined = process.env.DB_PORT,
    dbname: string | undefined = process.env.DB_NAME,
    salt: string | undefined = process.env.SALT
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
