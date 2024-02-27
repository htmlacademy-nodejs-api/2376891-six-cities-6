import { defaultClasses, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity, UserEntity } from '../index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public text!: string;

  @prop({ ref: OfferEntity, required: true })
  public offerId!: Ref<OfferEntity>;

  @prop({ ref: UserEntity, required: true })
  public userId!: Ref<UserEntity>;

  // @prop({ trim: true, required: true })
  // public date?: string;

  @prop({ trim: true, required: true })
  public rating!: number;
}