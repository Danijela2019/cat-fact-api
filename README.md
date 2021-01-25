# cat-fact-api( JSON file)

## Introduction

This is a simple API using Node.js Express framework for managing cat facts data. The data is saved in a json file for the first version and the retrieval of the data is done asynchronously to mimic the behavior of a real database. The idea is in the future to replace the json file with a real database.
There is another branch(MongoDB) where the data is stored in MongoDB.

## Functionalities

- **get all cat facts**
- **get a specific cat fact**
- **update a specific cat fact**
- **remove a specific cat fact**
- **get a random cat fact**

## How to test it

- **Clone the repo: https://github.com/Danijela2019/cat-facts-api.git**
- **Install packages: npm install**
- **Run the 'npm start' command**
- **connect it to your frontend or use [POSTMAN](https://www.postman.com/) to test it**

## Available endpoints

- **BASE URL: /api/v1/catfacts | (returns all cat facts)**
- **GET /:id | (returns a cat fact with a specific id)**
- **GET /catfact/random | (returns a random cat fact)**
- **POST / | (add a new cat fact)**
- **PUT /:id | (update a cat fact with a specific id)**
- **DELETE /:id | (delete a cat fact with a specific id)**
