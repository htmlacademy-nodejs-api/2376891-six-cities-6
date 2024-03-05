import {
  DocumentType,
  Ref
} from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { IDocumentExists } from '../../types/document-exists.interface.js';
import { TFindOfferParameters } from './type/find-offer-parameters.type.js';
import { TFindPremiumOfferParameters } from './type/find-premium-offer-parameters.type.js';
import { TAddFavoriteOfferParameters } from './type/add-favorite-parameters.type.js';

export interface OfferService extends IDocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findByOfferId(data: TAddFavoriteOfferParameters): Promise<DocumentType<OfferEntity>[] | null>;
  find(params: TFindOfferParameters): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: string | undefined, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremium(params: TFindPremiumOfferParameters): Promise<DocumentType<OfferEntity>[]>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  findFavorites(favorites: Ref<OfferEntity>[] | undefined): Promise<DocumentType<OfferEntity>[]>;
}
