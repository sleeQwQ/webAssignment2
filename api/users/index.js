import express from 'express';
import User from './userModel';
import movieModel from '../movies/movieModel';
import upcomingModel from '../upcoming/upcomingModel';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', (req, res ,next) => {
    User.find().then(users =>  res.status(200).json(users)).catch(next);
});

router.get('/:userName', async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);
  if (!user) return res.status(404).json({ code: 404, msg: 'User not found.' });
  return res.status(200).send();
});

// Update a user
router.put('/:userName', async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);
  if (!user) return res.status(404).json({ code: 404, msg: 'User not found.' });
  User.update({
    _id: user._id,
  }, req.body, {
    upsert: false,
  })
  .then(res.status(200).json({ code: 200, msg: 'Update Successfully.' }));
});

router.delete('/:userName', async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);
  if (!user) return res.status(404).json({ code: 404, msg: 'User not found.' });
  await User.deleteOne(user);
    res.status(200).send({ code: 200, msg: 'Delete successfully'});
});

// eslint-disable-next-line no-unused-vars
router.post('/:userName/favourites', async (req, res, next) => {
  const newFavourite = req.body.id;
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(newFavourite);
  if (!movie) return res.status(401).json({ code: 401, msg: 'Invaild movie id.' });
  const user = await User.findByUserName(userName);
  if (!user) return res.status(404).json({ code: 404, msg: 'User not found.' });
  if (user.favourites.indexOf(movie.id) === -1) {
    await user.favourites.push(movie.id);
    await user.save(); 
    return res.status(201).json(user); 
  } else {
    return res.status(201).json({ msg: 'Alreday have this movie', user }); 
  }
});

router.get('/:userName/favourites', async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);
  if (!user) return res.status(404).json({ code: 404, msg: 'User not found.' });
  res.status(200).json(user.favourites);
});

router.delete('/:userName/favourites/:id', async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);
  if (!user) return res.status(404).json({ code: 404, msg: 'User not found.' });
  if (isNaN(req.params.id)) return res.status(404).json({ code: 404, msg: 'Invaild movie id.' });
  const id = parseInt(req.params.id);
  const movie = await movieModel.findByMovieDBId(id);
  if (user.favourites.indexOf(movie.id) !== -1) {
    await user.removeFromFavourites(id);
  } else {
    return res.status(404).json({ code: 404, msg: "This movie is not in favourites."});
  }
  await user.save(); 
  res.status(200).send({ code: 200, msg: 'Delete successfully'});
});

router.post('/:userName/watchlist', async (req, res) => {
  const listMovie = req.body.id;
  const userName = req.params.userName;
  const movie = await upcomingModel.findByMovieDBId(listMovie);
  if (!movie) return res.status(401).json({ code: 401, msg: 'Invaild movie id.' });
  const user = await User.findByUserName(userName);
  if (!user) return res.status(404).json({ code: 404, msg: 'User not found.' });
  if (user.watchlist.indexOf(movie.id) === -1) {
    await user.watchlist.push(movie.id);
    await user.save(); 
    return res.status(201).json(user); 
  } else {
    return res.status(201).json({  code: 404, msg: 'Alreday have this movie', user }); 
  }
});

router.get('/:userName/watchlist', async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);
  if (!user) return res.status(404).json({ code: 404, msg: 'User not found.' });
  res.status(200).json(user.watchlist);
});

router.delete('/:userName/watchlist/:id', async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);
  if (!user) return res.status(404).json({ code: 404, msg: 'User not found.' });
  if (isNaN(req.params.id)) return res.status(404).json({ code: 404, msg: 'Invaild movie id.' });
  const id = parseInt(req.params.id);
  const movie = await movieModel.findByMovieDBId(id);
  if (user.watchlist.indexOf(movie.id) !== -1) {
    await user.removeFromWatchlist(id);
  } else {
    return res.status(404).json({ code: 404, msg: "This movie is not in watch list."});
  }
  await user.save(); 
  res.status(200).send({ code: 200, msg: 'Delete successfully'});
});

export default router;