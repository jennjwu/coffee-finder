# coffee-finder
restful service to find the nearest coffee shop

## Setup
1. Install node and npm
1. Clone this project

## Usage
1. `node index.js` to start the server locally
1. Visit `localhost:3000` to hit the server. Available endpoints are documented in the next section.

## Endpoints
- `GET /locations`: fetches all locations
- [get location](docs/get.md): `GET /location/:id`
- [create location](docs/create.md): `POST /location`
- [update location](docs/update.md): `PATCH /location/:id`
- [delete location](docs/delete.md): `DELETE /location/:id`
- get nearest coffee

## Development
Using [nodemon](https://www.npmjs.com/package/nodemon) to auto restart node app upon file changes:
 
 ``` npx nodemon```
 
 or if installed globally:
 
 ``` nodemon```
 
