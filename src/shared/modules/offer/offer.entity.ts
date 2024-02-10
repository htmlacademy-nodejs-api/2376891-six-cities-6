import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { CityName, Good, HousingType, TLocation, TOffer } from '../../types/index.js';
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
export class OfferEntity extends defaultClasses.TimeStamps implements TOffer {
  @prop({ required: true, trim: true, minlength: [10, 'Min length for title is 10'], maxlength: [100, 'Max length for title is 100'] })
  public title!: string;

  @prop({ required: true, trim: true, minlength: [20, 'Min length for description is 20'], maxlength: [1024, 'Max length for description is 1024']})
  public description!: string;

  @prop({ required: true })
  public date!: Date;

  @prop({ required: true, enum: CityName, type: () => String })
  public city!: CityName;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ required: true, dim: 6, type: String, default: [] })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public isFavorite!: boolean;

  @prop({ required: true, min: [1, 'Min value for rating is 1'], max: [5, 'Max value for rating is 5'] })
  public rating!: number;

  @prop({ required: true, enum: HousingType, type: () => String })
  public housingType!: HousingType;

  @prop({ required: true, min: [1, 'Min number for bedrooms is 1'], max: [8, 'Max number for bedrooms is 8'] })
  public bedrooms!: number;

  @prop({ required: true, min: [1, 'Min number for maxAdults is 1'], max: [10, 'Max number for maxAdults is 10'] })
  public maxAdults!: number;

  @prop({ required: true, min: [100, 'Min value for price is 100'], max: [100000, 'Max value for price is 100000'] })
  public price!: number;

  @prop({ required: true, items: String, default: [] })
  public goods!: Good[];

  @prop({ required: true, ref: UserEntity })
  public userId!: Ref<UserEntity>;

  @prop({ required: false })
  public comments!: number;

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
    this.isFavorite = offerData.isFavorite;
    this.rating = offerData.rating;
    this.housingType = offerData.housingType;
    this.bedrooms = offerData.bedrooms;
    this.maxAdults = offerData.maxAdults;
    this.price = offerData.price;
    this.goods = offerData.goods;
    this.userId = offerData.userId;
    this.comments = offerData.comments;
    this.location = offerData.location;
  }
}

export const OfferModel = getModelForClass(OfferEntity);
