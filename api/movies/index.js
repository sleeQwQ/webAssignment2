/* eslint-disable no-unused-vars */
import express from 'express';
import { getMovieReviews } from '../tmdb-api';
import movieModel from './movieModel';

const router = express.Router();

router.get('/', (req, res, next) => {
  movieModel.find().then(movies => res.status(200).send(movies)).catch(next);
});

// Add a movie
router.post('/', async (req, res, next) => {
  let newMovie = req.body;
  if (newMovie && newMovie.title) {
    //Adds a random id if missing. 
    !newMovie.id ? newMovie.id = Math.round(Math.random() * 10000) : newMovie;
    await movieModel.create(newMovie).catch(next);
    res.status(201).send(newMovie);
  } else {
    res.status(412).send({ code: 412,  msg: 'Please add a title' });
  }
});

router.get('/:id', async (req, res, next) => {
  if (isNaN(req.params.id)) return res.status(404).json({ code: 404, msg: 'Invaild movie id.' });
  const id = parseInt(req.params.id);
  const movie = await movieModel.findByMovieDBId(id);
  if (!movie) return res.status(404).json({ code: 404, msg: 'The resource you requested could not be found.' });
  res.status(200).json(movie);
});

// Update a movie
router.put('/:id', async (req, res, next) => {
  if (isNaN(req.params.id)) return res.status(404).json({ code: 404, msg: 'Invaild movie id.' });
  const id = parseInt(req.params.id);
  const updateMovie = req.body;
  if (movieModel.findByMovieDBId(id)) {
    !updateMovie.id ? updateMovie.id = id : updateMovie;
    if (req.body._id) delete req.body._id;
    await movieModel.findOneAndUpdate({id: updateMovie.id}, updateMovie).catch(next);
    res.status(201).json(updateMovie);
  } else {
    res.status(404).send({ code: 404,  msg: 'The resource you requested could not be found.' });
  }
});

// Delete a moive
router.delete('/:id', async (req, res) => {
  if (isNaN(req.params.id)) return res.status(404).json({ code: 404, msg: 'Invaild movie id.' });
  const id = parseInt(req.params.id);
  if (movieModel.findByMovieDBId(id)) {
    await movieModel.deleteOne({"id":id});
    res.status(200).send({ code: 200, msg: 'Delete successfully'});
  } else {
    res.status(404).send({ code: 404, msg: 'The resource you requested could not be found.'});
  }
});

router.get('/:id/reviews', async (req, res, next) => {
  if (isNaN(req.params.id)) return res.status(404).json({ code: 404, msg: 'Invaild movie id.' });
  const id = parseInt(req.params.id);
  const reviews = await getMovieReviews(id);
  if (reviews == "") return res.status(404).json({ code: 404, msg: 'No reviews yet in this movie.' });
  res.status(200).json(reviews);
});

export default router;