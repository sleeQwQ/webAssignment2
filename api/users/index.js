import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';
import movieModel from '../movies/movieModel';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', (req, res ,next) => {
    User.find().then(users =>  res.status(200).json(users)).catch(next);
});

// Register OR authenticate a user
router.post('/', async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json({
      success: false,
      msg: 'Please pass username and password.',
    });
  }
  if (req.query.action === 'register') {
    const goodpwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if (!req.body.password.match(goodpwd)) {
      res.status(412).json({
        code: 412,
        msg: 'Register failed. Bad password.'
      });
    } else {
      await User.create(req.body).catch(next);
      res.status(201).json({
        code: 201,
        msg: 'Successfully created new user.',
      });
    }
  } else {
    const user = await User.findByUserName(req.body.username).catch(next);
      if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.username, process.env.SECRET);
          // return the information including token as JSON
          res.status(200).json({
            success: true,
            token: 'BEARER ' + token,
          });
        } else {
          res.status(401).json({
            code: 401,
            msg: 'Authentication failed. Wrong password.'
          });
        }
      });
    }
});

// Update a user
router.put('/:userName', async (req, res ,next) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);
  User.update({
    _id: user._id,
  }, req.body, {
    upsert: false,
  })
  .then(res.status(200).json({ code: 200, msg: 'Update Successfully.' }))
  .catch(next);
});

// eslint-disable-next-line no-unused-vars
router.post('/:userName/favourites', async (req, res, next) => {
  const newFavourite = req.body.id;
  const userName = req.params.userName;
  const movie = await movieModel.findByMovieDBId(newFavourite);
  if (!movie) return res.status(401).json({ code: 401, msg: 'Invaild movie id.' });
  const user = await User.findByUserName(userName);
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