'use strict';

console.log('Gledaj!  First server!');

// REQUIRED
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather.js');

//Express instance
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

//Endpoints

app.get('/', (request, response) => {
  console.log('This base route is showing up in the terminal!');
  response.status(200).send('Welcome to our server');
});

app.get('/hello', (request, response) => {
  console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello ${firstName} ${lastName} from the hello route!`);
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);


// Catch all - needs to be at the bottom
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// // ERRORS
// // Handle any errors
app.use((error, request, response, next)=> {
  response.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`We are up on PORT: ${PORT}`));
