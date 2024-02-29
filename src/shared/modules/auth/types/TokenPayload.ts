import { EUserAccountType } from '../../../types/index.js';

export type TTokenPayload = {
  id: string,
  name: string,
  email: string,
  avatarUrl?: string,
  accountType: EUserAccountType,
}
