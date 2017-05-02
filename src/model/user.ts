import { Document } from 'mongoose';
import { IUser } from '../common/types/userType';

export interface IUserModel extends IUser, Document {
    //custom methods for your model would be defined here
}
