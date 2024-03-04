import { Ref, defaultClasses, modelOptions, prop } from '@typegoose/typegoose';
import { ECityName, EGood, EOfferType as EOfferType, TLocation } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true, type: () => String })
  public title!: string;

  @prop({ required: true, trim: true, type: () => String })
  public description!: string;

  @prop({ required: true })
  public date!: Date;

  @prop({ required: true, type: () => String })
  public city!: ECityName;

  @prop({ required: true, type: () => String, default: 'https://14.design.htmlacademy.pro/static/avatar/6.jpg' })
  public previewImage!: string;

  @prop({ required: true, type: () => [String] })
  public images!: string[];

  @prop({ required: true, type: () => Boolean })
  public isPremium!: boolean;

  @prop({ required: true, type: () => Number })
  public rating!: number;

  @prop({ required: true, type: () => String })
  public offerType!: EOfferType;

  @prop({ required: true, type: () => Number })
  public bedrooms!: number;

  @prop({ required: true, type: () => Number })
  public maxAdults!: number;

  @prop({ required: true, type: () => Number })
  public price!: number;

  @prop({ required: true, type: () => [String] })
  public goods!: EGood[];

  @prop({ required: true, ref: () => UserEntity })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0, type: () => Number })
  public commentCount!: number;

  @prop({ required: true })
  public location!: TLocation;
}
