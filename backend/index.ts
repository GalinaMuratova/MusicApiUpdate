import express from 'express';
import artistsRouter from "./routers/artists";
import mongoose from "mongoose";
import cors from 'cors';
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";
import usersRouter from "./routers/users";
import tracksHistoryRouter from "./routers/tracksHistory";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', tracksHistoryRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/music');
    app.listen(port, ()=> {
        console.log(`Server started on ${port} port`);
    });
};

run().catch(e => console.error(e));
