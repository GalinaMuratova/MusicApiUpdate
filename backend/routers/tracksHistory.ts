import express from 'express';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';

const tracksHistoryRouter = express.Router();

tracksHistoryRouter.get('/', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;
  try {
    const trackHistory = await TrackHistory.find({ user: user._id }).populate('track', 'name');
    res.send(trackHistory);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

tracksHistoryRouter.post('/', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;

  if (!req.body.track) {
    return res.status(400).send({ error: 'Track ID is required in the request body' });
  }

  const now = new Date();
  const createdAt = now.toISOString();
  const trackHistory = new TrackHistory({
    user: user._id,
    track: req.body.track,
    datetime: createdAt,
    artist: req.body.artist,
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
