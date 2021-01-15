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
+ Get /api/users/userName - returns detailed information on a specific user.
+ Put /api/users/userName - updates a specific user.
+ Delete /api/users/userName - deletes a specific user.
+ Post /api/users/userName/favourites - adds user's favourite movie
+ Get /api/users/userName/favourites - returns a specific user's favourite movie.

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
Tests: tests/functional/api/users/index.js, tests/functional/api/authentication/index.js

+ Post /api/users?action=register - Test the input without username or password. Test registering with a bad password. Test registering with an existing username. 
Tests: tests/functional/api/users/index.js

+ Get /api/users/userName - Test when there is no user matching the input name.
Tests: tests/functional/api/users/index.js

+ Put /api/users/userName - Test when there is no user matching the input name.
Tests: tests/functional/api/users/index.js

+ Delete /api/users/userName - Test when there is no user matching the input name.
Tests: tests/functional/api/users/index.js

+ Post /api/users/userName/favourites - Test when there is no user matching the input name. Test when the movie's id is invaild or no such movie. Test adding one specific movie twice.
Tests: tests/functional/api/users/index.js

## Continuous Delivery/Deployment.

+ https://movies-api-staging1632.herokuapp.com/ - Staging deployment
+ https://movies-api-prod1632.herokuapp.com/ - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![][stagingapp]

+ Production app overview 

[ , , , screenshot here . . . ]


[stagingapp]: ./img/stagingapp.png