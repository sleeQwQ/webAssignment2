import userModel from '../api/users/userModel';
import movieModel from '../api/movies/movieModel';
import upcomingModel from '../api/upcoming/upcomingModel';
import nowPlayingModel from '../api/nowPlaying/nowPlayingModel';
import topRatedModel from '../api/topRated/topRatedModel';
import loglevel from 'loglevel';
import {getMovies, getUpcomingMovies, getPlayingMovies, getTopRated} from '../api/tmdb-api';

const users = [
  {
    'username': 'user1',
    'password': 'test1',
  },
  {
    'username': 'user2',
    'password': 'test2',
  },
];

// deletes all user documents in collection and inserts test data
export async function loadUsers() {
  loglevel.info('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    loglevel.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    loglevel.info(`failed to Load user Data: ${err}`);
  }
}

// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  loglevel.info('load seed data');
  try {
    getMovies().then(async res => {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(res);
    loglevel.info(`${res.length} Movies were successfully stored.`);
    });
  } catch (err) {
    loglevel.info(`failed to Load movie Data: ${err}`);
  }
}

// deletes all upcoming movies documents in collection and inserts test data
export async function loadUpcoming() {
  loglevel.info('load seed data');
  try {
    getUpcomingMovies().then(async res => {
    await upcomingModel.deleteMany();
    await upcomingModel.collection.insertMany(res);
    loglevel.info(`${res.length} upcoming movies were successfully stored.`);
    });
  } catch (err) {
    loglevel.info(`failed to Load upcoming movie Data: ${err}`);
  }
}

// deletes all nowplaying movies documents in collection and inserts test data
export async function loadNowPlaying() {
  loglevel.info('load seed data');
  try {
    getPlayingMovies().then(async res => {
    await nowPlayingModel.deleteMany();
    await nowPlayingModel.collection.insertMany(res);
    loglevel.info(`${res.length} nowplaying movies were successfully stored.`);
    });
  } catch (err) {
    loglevel.info(`failed to Load nowplaying movie Data: ${err}`);
  }
}

// deletes all toprated movies documents in collection and inserts test data
export async function loadTopRated() {
  loglevel.info('load seed data');
  try {
    getTopRated().then(async res => {
    await topRatedModel.deleteMany();
    await topRatedModel.collection.insertMany(res);
    loglevel.info(`${res.length} toprated movies were successfully stored.`);
    });
  } catch (err) {
    loglevel.info(`failed to Load toprated movie Data: ${err}`);
  }
}