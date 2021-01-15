import express from 'express';
import User from '../users/userModel';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Register OR authenticate a user
router.post('/', async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.status(401).json({
        success: false,
        msg: 'Please pass username and password.',
      });
    }
    if (req.query.action === 'register') {
      const user = await User.findByUserName(req.body.username).catch(next);
      if (user) return res.status(412).json({ code: 412, msg: 'Already exists this user, please try another username.' });
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

  export default router;