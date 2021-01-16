# Assignment 2 - Agile Software Practice.

Name: Yannan Qian

## Target Web API.

+ Get /api/movies - returns an array of movie objects.
+ Post /api/movies - add a new movie to the database, add an id if it has no id.
+ Get /api/movies/:id - returns detailed information on a specific movie.
+ Put /api/movies/:id - updates a specific movie. 
+ Delete /api/movies/:id - delete a specific movie.
+ Get /api/movies/:id/reviews - returns reviews of a specific movie.
+ Get /api/users - returns an array of user objects.
+ Post /api/users - authenticates a user.
+ Post /api/users?action=register - registers a new user.
+ Get /api/users/:userName - returns detailed information on a specific user.
+ Put /api/users/:userName - updates a specific user.
+ Delete /api/users/:userName - deletes a specific user.
+ Post /api/users/:userName/favourites - adds user's favourite movie
+ Get /api/users/:userName/favourites - returns a specific user's favourite movie.
+ Delete /api/users/:userName/favourites/:id - delete a specific user's one specific favourite movie.
+ Post /api/users/:userName/watchlist - adds a movie into a specific user's watch list.
+ Get /api/users/:userName/watchlist - returns a specific user's watch list.
+ Delete /api/users/:userName/watchlist/:id - delete a specific user's one specific movie from movie list.
+ Get /api/upcoming - returns an array of upcoming movies.
+ Post /api/upcoming - add a new movie to the upcoming list, add an id if it has no id.
+ Get /api/upcoming/:id - check if a movie is in upcoming list, and return its info if true.

## Error/Exception Testing.

+ Get /api/movies - Test getting movies without prior authentication. 
Tests: tests/functional/api/authentication/index.js

+ Post /api/movies - Test when the new movie has no title. Test adding a movie without prior authentication. 
Tests: tests/functional/api/movies/index.js, tests/functional/api/authentication/index.js

+ Get /api/movies/:id - Test when the id is invaild. Test when there is no such movie. Test getting a movie without prior authentication. 
Tests: tests/functional/api/movies/index.js, tests/functional/api/authentication/index.js

+ Put /api/movies/:id - Test when the id is invaild or no such movie. Test updating a movie without prior authentication. 
Tests: tests/functional/api/movies/index.js, tests/functional/api/authentication/index.js

+ Delete /api/movies/:id - Test when the id is invaild or no such movie. Test deleting a movie without prior authentication. 
Tests: tests/functional/api/movies/index.js, tests/functional/api/authentication/index.js

+ Get /api/movies/:id/reviews - Test when the id is invaild or no such movie. Test when that movie has no reviews. Test getting reviews without prior authentication.
Tests: tests/functional/api/movies/index.js, tests/functional/api/authentication/index.js

+ Post /api/users - Test the input without username or password. Test with non-existing username. Test when password is wrong.
Tests: tests/functional/api/authentication/index.js

+ Post /api/users?action=register - Test the input without username or password. Test registering with a bad password. Test registering with an existing username. 
Tests: tests/functional/api/authentication/index.js

+ Get /api/users/:userName - Test when there is no user matching the input name.
Tests: tests/functional/api/users/index.js

+ Put /api/users/:userName - Test when there is no user matching the input name.
Tests: tests/functional/api/users/index.js

+ Delete /api/users/:userName - Test when there is no user matching the input name.
Tests: tests/functional/api/users/index.js

+ Post /api/users/:userName/favourites - Test when there is no user matching the input name. Test when the movie's id is invaild or no such movie. Test adding one specific movie twice.
Tests: tests/functional/api/users/index.js

+ Get /api/users/:userName/favourites - Test when there is no user matching the input name. 
Tests: tests/functional/api/users/index.js

+ Delete /api/users/:userName/favourites/:id - Test when there is no user matching the input name. Test when the id is invaild or no such movie.
Tests: tests/functional/api/users/index.js

+ Post /api/users/:userName/watchlist - Test when there is no user matching the input name. Test when the movie's id is invaild or no such movie. Test adding one specific movie twice.
Tests: tests/functional/api/users/index.js

+ Get /api/users/:userName/watchlist - Test when there is no user matching the input name. 
Tests: tests/functional/api/users/index.js

+ Delete /api/users/:userName/watchlist/:id - Test when there is no user matching the input name. Test when the id is invaild or no such movie.
Tests: tests/functional/api/users/index.js

+ Get /api/upcoming - Test getting upcoming movies without prior authentication. 
Tests: tests/functional/api/authentication/index.js

+ Post /api/upcoming - Test when the new movie has no title. Test adding a movie without prior authentication. 
Tests: tests/functional/api/upcoming/index.js, tests/functional/api/authentication/index.js

+ Get /api/upcoming/:id - Test when the id is invaild. Test when there is no such movie. Test getting an upcoming movie without prior authentication. 
Tests: tests/functional/api/upcoming/index.js, tests/functional/api/authentication/index.js

## Continuous Delivery/Deployment.

+ https://movies-api-staging1632.herokuapp.com/ - Staging deployment
+ https://movies-api-prod1632.herokuapp.com/ - Production

+ Staging app overview 

![][stagingapp]

+ Production app overview 

![][prodapp]


[stagingapp]: ./public/stagingapp.png
[prodapp]: ./public/prodapp.png