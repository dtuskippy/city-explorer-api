'use strict';

console.log('Gledaj!  First server!');

// REQUIRED
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather.js');

//DATA
let dataPet = require('./data/pets.json');
// let data = require('./data/weather.json');

//Express instance
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

//////////////////////////////////

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

app.get('/pet', (request, response, next) => {
  try {
    let species = request.query.species;
    console.log(species);
    // let dataToSend = dataPet.find(pet => pet.species === species);
    let dataToGroom = dataPet.find(pet => pet.species === species);
    let dataToSend = new Pet(dataToGroom);
    response.status(200).send(dataToSend);
    // response.status(200).send('you requested a species');
  } catch (error) {
    next(error);
  }
});


///Adam function code
// app.get('/photos', getPhotos);

// async function getPhotos(request, response) {
//     // note the .searchQuery
//     const searchQuery = request.query.searchQuery;
//     const url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${searchQuery}`;
//     try {
//         // axios get request to our api
//         const photosResponse = await axios.get(url);
//         // console.log(photosResponse);
//         // groomed data
//         const photoArray = photosResponse.data.results.map(photo => new Photo(photo));
//         response.status(200).send(photoArray);
//     } catch (err) {
//         console.log('error message is: ', err);
//         response.status(500).send(`server error`);
//     }
// }

///AC NEW WEATHER CODE ////////////////////////////////////////////
app.get('/weather', getWeather);

// async function getWeather(request, response, next) {

//   const lat = request.query.lat;
//   const lon = request.query.lon;
//   console.log('lat', lat);
//   console.log('lon', lon);
//   const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHERBIT_API_KEY}`;
//   console.log(url);
//   // const url = http://api.weatherbit.io/v2.0/forecast/daily?key=9e38424d9f774ef3995a3244ca4c1a11&lat=38.123&lon=-78.543
//   //let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
  
//   try {
//     const weatherResponse = await axios.get(url);
//     console.log(weatherResponse);
    
//     const dataToSend = weatherResponse.data.data.map(object => {
//       return new Forecast(object);
//     });

//     response.status(200).send(dataToSend);

//   } catch (error) {
//     next(error);
//   }

// }

// class Forecast {
//   constructor(weatherObj) {
//     this.date = weatherObj.valid_date;
//     this.description = weatherObj.weather.description;
//   }
// }

////AC MOVIE CODE BELOW/////////////////////////
app.get('/movies', getMovies);

// async function getMovies(request, response, next) {

//   const city = request.query.city;
//   console.log('city', city);
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
//   // https://api.themoviedb.org/3/search/movie?api_key=079169378594480c9faa05367e9900ab&language=en-US&query=Pittsburgh&page=1&include_adult=false

//   try {
//     const moviesResponse = await axios.get(url);
//     console.log(moviesResponse);
    
//     const dataToSend = moviesResponse.data.results.map(object => {
//       return new Movies(object);
//     });

//     response.status(200).send(dataToSend);

//   } catch (error) {
//     next(error);
//   }

// };

// class Movies {
//   constructor(moviesObj) {
//     this.date = moviesObj.original_title;
    
//   }
// }












/////////////PREVIOUS CODE BELOW
// ///AC original weather code
// app.get('/weather', (request, response, next) => {
  //   try {
    //     let city_name = request.query.city_name;
    //     console.log(city_name);
    //     // let dataToSend = data.find(weather => weather.city_name === city_name);
//     let dataToGroom = data.find(weather => weather.city_name === city_name);
//     let dataToSend = dataToGroom.data.map(object => {
//       return new Forecast(object);
//     });
//     // let dataToSend = new Weather(dataToGroom);
//     // response.status(200).s-end('you requested a city');
//     response.status(200).send(dataToSend);
//   } catch (error) {
//     next(error);
//   }
// });

// app.get('/pet', (request, response, next) => {
//   try {
//     let species = request.query.species;
//     // console.log(species);
//     let dataToGroom = data.find(pet => pet.species === species);
//     let dataToSend = new Pet(dataToGroom);
//     response.status(200).send(dataToSend);
//   } catch (error) {
//     // if I have an error, this will create a new instance of the Error Object that lives in Express.
//     next(error);
//   }
// });

//movies
// https://api.themoviedb.org/3/search/tv?api_key=079169378594480c9faa05367e9900ab&language=en-US&page=1&query=Pittsburgh&include_adult=false
//

class Pet {
  constructor(petObj){
    this.name = petObj.name;
    this.breed = petObj.breed;
  }
}

// class Weather {
//   constructor(weatherObj){
//     this.lat = weatherObj.lat;
//     this.lon = weatherObj.lon;
//   }
// }

// // Catch all - needs to be at the bottom
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist');
});

// // ERRORS
// // Handle any errors
app.use((error, request, response, next)=> {
  response.status(500).send(error.message);
});

app.listen(PORT, ()=> console.log(`We are up on PORT: ${PORT}`));
