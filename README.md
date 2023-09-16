# Backend
## express + mongodb with JWT authentication




#### instructions to run
- clone the repo
- npm i
- npm run dev

#### instructions to test the app concurrency
- the purchase route is protected and requires user JWT token
- before hitting the route, login into the app and use the obtained token in response to hit the purchase route with any load testing tool


## Features

- Use of mongodb sessions to tackle the concurrency and mantain atomicity.
- Stateless authentication with JWT tokens 
- Use of compound indexes for user and item purchase pair creation, so that one user can purchase an item not more than once.
- Role base protected routes.
