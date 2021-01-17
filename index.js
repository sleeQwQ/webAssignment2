/* eslint-disable no-unused-vars */
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import loglevel from 'loglevel';
import './db';
import {loadUsers, loadMovies, loadUpcoming} from './seedData';
import moviesRouter from './api/movies';
import usersRouter from './api/users';
import upcomingRouter from './api/upcoming';
import authenticationRouter from './api/authentication';
import genresRouter from './api/genres';
import session from 'express-session';
import passport from './authenticate';

dotenv.config();

if (process.env.NODE_ENV === 'test') {
  loglevel.setLevel('warn');
} else {
  loglevel.setLevel('info');
}

if (process.env.SEED_DB) {
  loadUsers();
  loadMovies();
  loadUpcoming();
}

const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};

const app = express();

const port = process.env.PORT ;

const YAML = require('yamljs');
var swaggerUi=require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');

//session middleware
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

// if (process.env.NODE_ENV !== 'test') {  
//   app.use(logger('dev'));
// }
//configure body-parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded());

app.use(express.static('public'));

app.use(passport.initialize());

app.use('/api/authentication', authenticationRouter);

app.use('/api/movies', moviesRouter);

app.use('/api/upcoming', passport.authenticate('jwt', {session: false}), upcomingRouter);

app.use('/api/users', usersRouter);

app.use('/api/genres', genresRouter);

app.use(errHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let server = app.listen(port, () => {
  loglevel.info(`Server running at ${port}`);
});

module.exports = server;