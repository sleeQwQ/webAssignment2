import express from 'express';
import User from './userModel';
import movieModel from '../movies/movieModel';

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

router.get('/:userName/favourites', (req, res, next) => {
  const userName = req.params.userName;
  User.findByUserName(userName).populate('favourites').then(
    user => res.status(201).json(user.favourites)
  ).catch(next);
});

export default router;