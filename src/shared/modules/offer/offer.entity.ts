import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { ECityName, EGood, EOfferType as EOfferType, TLocation, TOffer } from '../../types/index.js';
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
  @prop({ required: true, trim: true })
  public title!: string;

  @prop({ required: true, trim: true })
  public description!: string;

  @prop({ required: true })
  public date!: Date;

  @prop({ required: true, type: () => String })
  public city!: ECityName;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ required: true })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public rating!: number;

  @prop({ required: true, type: () => String })
  public offerType!: EOfferType;

  @prop({ required: true })
  public bedrooms!: number;

  @prop({ required: true })
  public maxAdults!: number;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true, type: () => String })
  public goods!: EGood[];

  @prop({ required: true, ref: () => UserEntity, _id: false })
  public userId!: Ref<UserEntity>;

  @prop({ required: false, default: 0 })
  public commentCount!: number;

  @prop({ required: true })
  public location!: TLocation;

  constructor(offerData: TOffer) {
    super();

    this.title = offerData.title;
    this.description = offerData.description;
    this.date = offerData.date;
    this.city = offerData.city;
    this.previewImage = offerData.previewImage;
    this.images = offerData.images;
    this.isPremium = offerData.isPremium;
    this.rating = offerData.rating;
    this.offerType = offerData.offerType;
    this.bedrooms = offerData.bedrooms;
    this.maxAdults = offerData.maxAdults;
    this.price = offerData.price;
    this.goods = offerData.goods;
    this.userId = offerData.userId;
    this.commentCount = offerData.commentCount;
    this.location = offerData.location;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
