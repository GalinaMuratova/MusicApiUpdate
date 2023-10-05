import express from 'express';
import Track from '../models/Track';
import { ITrack } from '../types';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res) => {
  try {
    if (req.query.album) {
      const tracks = await Track.find({ album: req.query.album })
        .populate('album', 'name')
        .sort({ number: 1 });
      return res.send(tracks);
    } else {
      const tracks = await Track.find().populate('album', 'name');
      return res.send(tracks);
    }
  } catch {
    return res.sendStatus(500);
  }
});

tracksRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const trackData: ITrack = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
      number: req.body.number,
    };

    const track = new Track(trackData);
    await track.save();
    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const published = await Track.findById(req.params.id);

    if (!published) {
      return res.sendStatus(404);
    }

    published.isPublished = !published.isPublished;

    await published.save();

    return res.send({ isPublished: published.isPublished });
  } catch (e) {
    next(e);
  }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const track = await Track.findOne({ _id: req.params.id });

    if (!track) {
      return res.sendStatus(403);
    }
    await Track.deleteOne({ _id: req.params.id });

    return res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

export default tracksRouter;
