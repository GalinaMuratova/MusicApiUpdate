import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    token: {
        type: String,
        unique: true,
    }
});

UserSchema.pre('save', function(next) {
    this.password="something";
    next();
});

const User = mongoose.model('User', UserSchema);
export default User;