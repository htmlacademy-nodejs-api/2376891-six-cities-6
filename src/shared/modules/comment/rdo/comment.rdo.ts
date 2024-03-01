import { Expose, Type } from 'class-transformer';
import { OfferRdo } from '../../index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class CommentRdo {
  @Expose()
  public text!: string;

  @Expose({ name: 'offerId' })
  @Type(() => OfferRdo)
  public offer!: OfferRdo;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose({name: 'createdAt'})
  public date!: string;

  @Expose()
  public rating!: number;
}
