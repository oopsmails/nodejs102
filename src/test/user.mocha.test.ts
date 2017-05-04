import 'mocha';
import { IUser } from '../common/types/userType';
import { IUserModel } from '../model/user';
import { userSchema } from '../mongo/schema/userSchema';

//use q promises
global.Promise = require('q').Promise;

//import mongoose
import mongoose = require('mongoose');

//use q library for mongoose promise
mongoose.Promise = global.Promise;

//connect to mongoose and create model
const MONGODB_CONNECTION: string = 'mongodb://boy:test123@127.0.0.1:27017/tutorialtoy';
const connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);
const User: mongoose.Model<IUserModel> = connection.model<IUserModel>('User', userSchema);

//require chai and use should() assertions
const chai = require('chai');
let should = chai.should();

describe('User', () => {

    describe('create()', () => {
        it('should create a new User', () => {
            //user object
            const user: IUser = {
                email: 'foo@bar.com',
                firstName: 'Brian',
                lastName: 'Love'
            };

            //create user and return promise
            return new User(user).save().then((result) => {
                //verify _id property exists
                // result._id.should.exist();

                //verify email
                result.email.should.equal(user.email);

                //verify firstName
                result.firstName.should.equal(user.firstName);

                //verify lastName
                result.lastName.should.equal(user.lastName);

                //clear up
                // User.find({ _id:result._id }).remove().exec();

                //clear up
                User.remove({ _id: result._id }, (err) => {
                    console.log(err);
                });


            });
        });
    });
});