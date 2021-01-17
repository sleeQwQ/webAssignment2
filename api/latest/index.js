import express from 'express';
import {getLatestMovie} from '../tmdb-api';

const router = express.Router();

router.get('/', (req, res, next) => {
  getLatestMovie()
  .then(movie => res.status(200).send(movie))
  .catch((error) => next(error));
});

export default router;