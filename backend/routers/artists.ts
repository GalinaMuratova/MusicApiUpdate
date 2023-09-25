import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {IArtist} from "../types";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
   try {
      const artists = await Artist.find();
      return res.send(artists);
   } catch {
      return res.sendStatus(500);
   }
});

artistsRouter.post('/',auth, imagesUpload.single('image'), async (req, res, next) => {
   try {
      const artistData:IArtist = {
         name: req.body.name,
         information: req.body.information,
         image: req.file? req.file.filename : null
      }
      const artist = new Artist(artistData);
      await artist.save();
      return res.send(artist);
   } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
         return res.status(400).send(e);
      }
      next(e);
   }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
   try {
      const artist = await Artist.findOne({_id: req.params.id});

      if (!artist) {
         return res.sendStatus(403);
      }
      await Artist.deleteOne({_id: req.params.id});

      return res.sendStatus(204);
   } catch (e) {
      next(e);
   }
});

export default artistsRouter;