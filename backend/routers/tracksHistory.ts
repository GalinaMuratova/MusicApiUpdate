import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import {imagesUpload} from "../multer";

const tracksHistoryRouter = express.Router();

tracksHistoryRouter.post('/',imagesUpload.single('image'), async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error:'Wrong'});
    }

    const user = await User.findOne({token});

    if(!user) {
        return res.status(401).send({error:'Wrong'});
    }

    if (!req.body.track) {
        return res.status(400).send({ error: 'Track ID is required in the request body' });
    }

    const now = new Date();
    const createdAt = now.toISOString()
    const trackHistory = new TrackHistory({
        user: user._id,
        track: req.body.track,
        datetime: createdAt,
    });

    try {
        await trackHistory.save();

        res.send({ message: 'Track history recorded', trackHistory });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

export default tracksHistoryRouter;