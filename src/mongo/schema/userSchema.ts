import { Schema } from 'mongoose';

export const userSchema: Schema = new Schema({
    createdAt: Date,
    email: String,
    firstName: String,
    lastName: String
});

userSchema.pre('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});
