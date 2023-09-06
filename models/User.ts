import {Model, model, Schema} from "mongoose";
import bcrypt from 'bcrypt';
import {IUser} from "../types";

const SALT_WORK_FACTOR= 10;

const UserSchema= new Schema<IUser> ({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save',  async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toJSON', {
    transform:(doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});


const User = model('User', UserSchema);
export default User;