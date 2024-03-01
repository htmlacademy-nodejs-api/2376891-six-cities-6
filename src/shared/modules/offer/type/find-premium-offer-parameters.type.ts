import { Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer.entity.js';

export type TFindPremiumOfferParameters = {
  userId?: string;
  city: string;
  userFavorites?: Ref<OfferEntity>[] | undefined;
}
