
'use strict';

const axios = require('axios');

async function getWeather(request, response, next) {

  const lat = request.query.lat;
  const lon = request.query.lon;
  console.log('lat', lat);
  console.log('lon', lon);
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHERBIT_API_KEY}`;
  console.log(url);
  // const url = http://api.weatherbit.io/v2.0/forecast/daily?key=9e38424d9f774ef3995a3244ca4c1a11&lat=38.123&lon=-78.543
  //let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

  try {
    const weatherResponse = await axios.get(url);
    console.log(weatherResponse);

    const dataToSend = weatherResponse.data.data.map(object => {
      return new Forecast(object);
    });

    response.status(200).send(dataToSend);

  } catch (error) {
    next(error);
  }

}

class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.valid_date;
    this.description = weatherObj.weather.description;
  }
}



module.exports = getWeather;
