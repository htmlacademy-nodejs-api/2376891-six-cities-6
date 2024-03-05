import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import cors from 'cors';
import { ILogger } from '../shared/libs/logger/index.js';
import { IConfig, TRestSchema } from '../shared/libs/config/index.js';
import { EComponent } from '../shared/types/index.js';
import { IDatabaseClient } from '../shared/libs/database-client/index.js';
import { getFullServerPath, getMongoURI } from '../shared/helpers/index.js';
import { IController, IExceptionFilter, ParseTokenMiddleware } from '../shared/libs/rest/index.js';
import { STATIC_FILES_ROUTE, STATIC_UPLOAD_ROUTE } from './index.js';

@injectable()
export class RestApplication {
  private readonly server: Express = express();

  constructor(
    @inject(EComponent.Logger) private readonly logger: ILogger,
    @inject(EComponent.Config) private readonly config: IConfig<TRestSchema>,
    @inject(EComponent.DatabaseClient) private readonly databaseClient: IDatabaseClient,
    @inject(EComponent.ExceptionFilter) private readonly appExceptionFilter: IExceptionFilter,
    @inject(EComponent.UserController) private readonly userController: IController,
    @inject(EComponent.OfferController) private readonly offerController: IController,
    @inject(EComponent.CommentController) private readonly commentController: IController,
    @inject(EComponent.AuthExceptionFilter) private readonly authExceptionFilter: IExceptionFilter,
    @inject(EComponent.HttpExceptionFilter) private readonly httpExceptionFilter: IExceptionFilter,
    @inject(EComponent.ValidationExceptionFilter) private readonly validationExceptionFilter: IExceptionFilter,
  ) { }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(
      STATIC_UPLOAD_ROUTE,
      express.static(this.config.get('UPLOAD_DIRECTORY_PATH'))
    );
    this.server.use(
      STATIC_FILES_ROUTE,
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.server.use(cors());
  }

  private async initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this.initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialization completed');

    this.logger.info('Try to init server...');
    await this.initServer();
    this.logger.info(`🚀 Server started on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }
}
