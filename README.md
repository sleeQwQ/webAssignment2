# Assignment 2 - Web API.

Name: Yannan Qian

## Features.
 
 + Feature 1 - Several additional endpoints
 + Feature 2 - Detailed error handling, robustness testing and json messages
 + Feature 3 - Swagger graphic API design
 + Feature 4 - Cloud based Mongodb database

## Installation Requirements

```bat
git clone https://github.com/sleeQwQ/webAssignment2
```

```bat
npm install
```

## API Configuration

```bat
NODE_ENV=development
PORT=8080
HOST=
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
```


## API Design

|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies | Get a list of movies | Post a new movie | N/A | N/A
| /api/movies/{movieid} | Get a movie | N/A | Update a movie | Delete that movie
| /api/movies/{movieid}/reviews | Get all reviews for movie | N/A | N/A | N/A  
| /api/upcoming | Get a list of upcoming movies | Post a new upcoming movie| N/A | N/A
| /api/upcoming/{movieid} | Get an upcoming movie by id | N/A | N/A | Delete that movie from upcoming list
| /api/users | Get all users | Log in or register | N/A | N/A
| /api/users/{username} | Get user by name | N/A | Update that user's info | Delete that user
| /api/users/{username}/favourites | Get user's favourites list | Add a movie to one's favourite list | N/A | N/A
| /api/users/{username}/favourites/{movieid} | N/A | N/A | N/A | Delete a movie by id from one's favourite list
| /api/users/{username}/watchlist | Get user's watch list | Add a movie to one's watch list | N/A | N/A
| /api/users/{username}/watchlist/{movieid} | N/A | N/A | N/A | Delete a movie by id from one's watch list
| /api/genres | Get all genres | Post a new movie | N/A | N/A


If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).


## Security and Authentication
 + passport - JWTStratrgy

# Protected routes
 + /api/upcoming/

## Integrating with React App

React url: https://github.com/sleeQwQ/wad2-moviesApp

# Integration example

~~~Javascript
  export const getUpcomingMovies = () => {
    return fetch(
      '/api/upcoming',{headers:{
        'Authorization': window.localStorage.getItem('token') 
      },
      method:'get',
      }
    )
      .then(res => res.json());
  };

~~~

Don't forget to add "proxy": YOURHOST in package.json

## Extra features

 + Each API request method has several error handling cases with a status code and description — making user know what's wrong easily.
 + Swagger graphic API design. You can try the requests in a graphic interface.
 + Cloud based Mongodb database from 'https://cloud.mongodb.com/'. You can get one and use the connection url as 'YourMongoURL' in env.
