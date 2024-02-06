import { Schema, Document, model } from 'mongoose';
import { IUser, UserAccountType } from '../../types/index.js';

export interface UserDocument extends IUser, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    minlength: [1, 'Min length for name is 1'],
    maxlength: [15, 'Max length for name is 15'],
  },
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    require: true,
  },
  avatarUrl: String,
  password: {
    type: String,
    require: true,
    minlength: [6, 'Min length for password is 6'],
    maxlength: [12, 'Max length for password is 12'],
  },
  accountType: {
    type: String,
    require: true,
    enum: [`${UserAccountType.Common}`, `${UserAccountType.Pro}`],
  },
}, {timestamps: true});

export const UserModel = model<UserDocument>('User', userSchema);
