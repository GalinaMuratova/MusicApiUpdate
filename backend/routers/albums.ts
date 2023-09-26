import express from "express";
import mongoose from "mongoose";
import Album from "../models/Album";
import {IAlbum} from "../types";
import {imagesUpload} from "../multer";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const albumsRouter = express.Router();

albumsRouter.get('/', async(req, res) => {
    try {
        if (req.query.artist) {
            const albums = await Album.find({artist: req.query.artist}).populate('artist', 'name').sort({year: -1});
            return res.send(albums);
        } else {
            const albums = await Album.find().populate('artist', 'name');
            return res.send(albums);
        }
    } catch {
        return res.sendStatus(500);
    }
});

albumsRouter.get('/:id', async(req, res) => {
   try {
       const album = await Album.findById(req.params.id).populate('artist','name');
       if (!album) {
           return res.sendStatus(404);
       }
       return res.send(album);
   } catch {
       return res.sendStatus(500);
   }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const albumData: IAlbum = {
            name: req.body.name,
            year: req.body.year,
            artist: req.body.artist,
            image: req.file ? req.file.filename : null
        };
        const album = new Album(albumData);
        await album.save();
        return res.send(album);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const published = await Album.findById(req.params.id);

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

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const album = await Album.findOne({_id: req.params.id});

        if (!album) {
            return res.sendStatus(403);
        }
        await Album.deleteOne({_id: req.params.id});

        return res.sendStatus(204);
    } catch (e) {
        next(e);
    }
});

export default albumsRouter;