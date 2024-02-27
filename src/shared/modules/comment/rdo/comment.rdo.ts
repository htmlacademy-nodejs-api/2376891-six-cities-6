import { Expose, Type } from 'class-transformer';
import { OfferRdo } from '../../index.js';

export class CommentRdo {
  // @Expose()
  // public id!: string;

  @Expose()
  public text!: string;

  @Expose({ name: 'offerId' })
  @Type(() => OfferRdo)
  public offer!: OfferRdo;

  @Expose({ name: 'userId' })
  @Type(() => OfferRdo)
  public user!: OfferRdo;

  @Expose({name: 'createdAt'})
  public date!: string;

  @Expose()
  public rating!: number;
}
