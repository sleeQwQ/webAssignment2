/* eslint-disable no-unused-vars */
import express from 'express';
import upcomingModel from './upcomingModel';

const router = express.Router();

router.get('/', (req, res, next) => {
  upcomingModel.find().then(upcomings => res.status(200).send(upcomings)).catch(next);
});

// Add a movie
router.post('/', async (req, res, next) => {
  let newMovie = req.body;
  if (newMovie && newMovie.title) {
    //Adds a random id if missing. 
    !newMovie.id ? newMovie.id = Math.round(Math.random() * 10000) : newMovie;
    await upcomingModel.create(newMovie).catch(next);
    res.status(201).send(newMovie);
  } else {
    res.status(412).send({ code: 412,  msg: 'Please add a title' });
  }
});

router.get('/:id', async (req, res, next) => {
  if (isNaN(req.params.id)) return res.status(404).json({ code: 404, msg: 'Invaild movie id.' });
  const id = parseInt(req.params.id);
  const movie = await upcomingModel.findByMovieDBId(id);
  if (!movie) return res.status(404).json({ code: 404, msg: 'The resource you requested could not be found.' });
  res.status(200).json(movie);
});

router.delete('/:id', async (req, res) => {
  if (isNaN(req.params.id)) return res.status(404).json({ code: 404, msg: 'Invaild movie id.' });
  const id = parseInt(req.params.id);
  if (upcomingModel.findByMovieDBId(id)) {
    await upcomingModel.deleteOne({"id":id});
    res.status(200).send({ code: 200, msg: 'Delete successfully'});
  } else {
    res.status(404).send({ code: 404, msg: 'The resource you requested could not be found.'});
  }
});

export default router;