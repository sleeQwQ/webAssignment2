/* eslint-disable no-unused-vars */
import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import bodyParser from 'body-parser';
import loglevel from 'loglevel';
import './db';
import {loadUsers} from './seedData';
import usersRouter from './api/users';

dotenv.config();

if (process.env.NODE_ENV === 'test') {
  loglevel.setLevel('warn');
} else {
  loglevel.setLevel('info');
}

if (process.env.SEED_DB === 'true' && process.env.NODE_ENV === 'development') {
  loadUsers();
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// if (process.env.NODE_ENV !== 'test') {  
//   app.use(logger('dev'));
// }
//configure body-parser
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api/movies', moviesRouter);

app.use('/api/users', usersRouter);

app.use(errHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let server = app.listen(port, () => {
  loglevel.info(`Server running at ${port}`);
});

module.exports = server;