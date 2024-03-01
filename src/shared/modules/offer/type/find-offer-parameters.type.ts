import { Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer.entity.js';

export type TFindOfferParameters = {
  userId?: string;
  offerCount: number;
  userFavorites?: Ref<OfferEntity>[] | undefined;
}
