import { Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer.entity.js';

export type TAddFavoriteOfferParameters = {
  userId?: string;
  offerId: string;
  userFavorites?: Ref<OfferEntity>[] | undefined;
}
