import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { EComponent } from '../../types/index.js';
import { OfferEntity, OfferModel, DefaultOfferService, OfferService } from '../index.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(EComponent.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(EComponent.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
