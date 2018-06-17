# coffee-finder
restful service to find the nearest coffee shop

## Setup
1. Install [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) should be installed with it.
1. Clone this project: `git clone https://github.com/jennjwu/coffee-finder.git`

## Usage
1. `node index.js` to start the server locally
1. Visit `localhost:3000` to hit the server. Available endpoints are documented in the next section.

## Endpoints
- get all locations: `GET /locations`
- [get location](docs/get.md): `GET /locations/:id`
- [create location](docs/create.md): `POST /locations`
- [update location](docs/update.md): `PATCH /locations/:id`
- [delete location](docs/delete.md): `DELETE /locations/:id`
- get nearest coffee: TBD

## Development
Using [nodemon](https://www.npmjs.com/package/nodemon) to auto restart node app upon file changes:
 
 ``` npx nodemon```
 
 or if installed globally:
 
 ``` nodemon```
 
