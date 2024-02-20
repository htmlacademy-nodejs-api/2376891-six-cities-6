import { getModelForClass } from '@typegoose/typegoose';
import { OfferEntity, UserEntity, CommentEntity } from './index.js';

export const OfferModel = getModelForClass(OfferEntity);
export const UserModel = getModelForClass(UserEntity);
export const CommentModel = getModelForClass(CommentEntity);
