import express from 'express';
import nowPlayingModel from './nowPlayingModel';

const router = express.Router();

router.get('/', (req, res, next) => {
  nowPlayingModel.find().then(NowPlaying => res.status(200).send(NowPlaying)).catch(next);
});

export default router;