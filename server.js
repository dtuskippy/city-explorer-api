'use strict';

console.log('Gledaj!  First server!');


// REQUIRED
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

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

///AC new weather code
app.get('/weather', getWeather);

async function getWeather(request, response) {
  const city_name = request.query.city_name;
  console.log(city_name);
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_APP_WEATHERBIT_API_KEY}&query=${city_name}`;
  try {
      const weatherResponse = await axios.get(url);
      console.log(weatherResponse);

      const dataToSend = weatherResponse.data.map(object => {
      return new Forecast(object);
      });

      response.status(200).send(dataToSend);

  } catch (error) {
    console.log('error message is: ', err);
    response.status(500).send(`server error`);
  }

};



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

class Pet {
  constructor(petObj){
    this.name = petObj.name;
    this.breed = petObj.breed;
  }
}

class Forecast {
	constructor(weatherObj) {
	 this.date = weatherObj.valid_date;	
	 this.description = weatherObj.weather.description;

 }
}



class Weather {
  constructor(weatherObj){
    this.lat = weatherObj.lat;
    this.lon = weatherObj.lon;
  }
}

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