import express from "express";
import User from "../models/User";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";

const usersRouter = express.Router();

usersRouter.post('/', imagesUpload.single('image'), async(req, res, next) => {
    try {
        const user= new User({
            username: req.body.username,
            password: req.body.password,
        });

        await user.save();
        return res.send(user);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

usersRouter.post('/sessions',imagesUpload.single('image'), async (req, res, next) => {
    res.send('lala')
});

export default usersRouter;
