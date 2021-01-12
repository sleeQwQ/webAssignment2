/* eslint-disable no-unused-vars */
import express from 'express';
import { getMovieReviews } from '../tmdb-api';
import movieModel from './movieModel';

const router = express.Router();

router.get('/', (req, res, next) => {
  movieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

router.get('/:id', async (req, res, next) => {
  if (isNaN(req.params.id)) return res.status(404).json({ code: 404, msg: 'Invaild movie id.' });
  const id = parseInt(req.params.id);
  const movie = await movieModel.findByMovieDBId(id);
  if (!movie) return res.status(404).json({ code: 404, msg: 'The resource you requested could not be found.' });
  res.status(200).json(movie);
});

router.get('/:id/reviews', async (req, res, next) => {
  if (isNaN(req.params.id)) return res.status(404).json({ code: 404, msg: 'Invaild movie id.' });
  const id = parseInt(req.params.id);
  const reviews = await getMovieReviews(id);
  if (reviews == "") return res.status(404).json({ code: 404, msg: 'No reviews yet in this movie.' });
  res.status(200).json(reviews);
});

export default router;