import { Schema, Document, model } from 'mongoose';
import { IUser } from '../../types/index.js';

export interface UserDocument extends IUser, Document {}

const userSchema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  password: String,
  accountType: String,
});

export const UserModel = model<UserDocument>('User', userSchema);
