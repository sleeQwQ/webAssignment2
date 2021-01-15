# Assignment 2 - Agile Software Practice.

Name: Yannan Qian

## Target Web API.

+ Get /api/movies - returns an array of movie objects.
+ Get /api/movies/:id - returns detailed information on a specific movie.
+ Put /api/movies/:id - updates a specific movie. The request payload includes the some/all of the following movie properties to be updated: title, genre list, release date.
+ Post /api/movies - add a new movie to the database, add an id if it has no id.
+ Delete /api/movies/:id - delete a specific movie.
+ Get /api/movies/:id/reviews - returns reviews of a specific movie.
+ Get /api/users - returns an array of user objects.
+ Post /api/users - authenticates a user.
+ Post /api/users?action=register - registers a new user.
+ Post /api/users/userName/favourites - adds user's favourite movie
+ Get /api/users/userName - returns detailed information on a specific user.
+ Put /api/users/userName - updates a specific user.
+ Get /api/users/userName/favourites - returns a specific user's favourite movie

## Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

+ Post /api/movies - test when the new movie has no title, invalid release date, empty genre list. Test adding a movie without prior authentication. See tests/functional/api/movies/index.js 

## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

+ https://movies-api-trial-staging.herokuapp.com/ - Staging deployment
+ https://movies-api-production.herokuapp.com/ - Production

.... Show a screenshots from the overview page for the two Heroku apps e,g,

+ Staging app overview 

![][stagingapp]

+ Production app overview 

[ , , , screenshot here . . . ]

[If an alternative platform to Heroku was used then show the relevant page from that platform's UI.]

## Feature Flags (If relevant)

... Specify the feature(s) in your web API that is/are controlled by a feature flag(s). Mention the source code files that contain the Optimizerly code that implement the flags. Show screenshots (with appropriate captions) from your Optimizely account that prove you successfully configured the flags.


[stagingapp]: ./img/stagingapp.png