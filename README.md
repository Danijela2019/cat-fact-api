# cat-fact-api( MONGO DB)

## Introduction

This is a simple API using Node.js Express framework for managing cat facts data. The data is saved in MongoDB data base using Mongoose as ORM for this purpose. All CRUD opperations are available through different API endpoints.
There is a different version of this API where the data is stored in a JSON file. The endpoint are the same.

## Functionalities

- **get all cat facts**
- **get a specific cat fact**
- **update a specific cat fact**
- **remove a specific cat fact**
- **get a random cat fact**

## Available endpoints

- **BASE URL: /api/v1/catfacts | (returns all cat facts)**
- **GET /:id | (returns a cat fact with a specific id)**
- **GET /catfact/random | (returns a random cat fact)**
- **POST / | (add a new cat fact)**
- **PUT /:id | (update a cat fact with a specific id)**
- **DELETE /:id | (delete a cat fact with a specific id)**
