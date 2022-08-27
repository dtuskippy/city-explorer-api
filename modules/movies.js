
'use strict';

const axios = require('axios');


async function getMovies(request, response, next) {

  const city = request.query.city;
  console.log('city', city);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
  // https://api.themoviedb.org/3/search/movie?api_key=079169378594480c9faa05367e9900ab&language=en-US&query=Pittsburgh&page=1&include_adult=false

  try {
    const moviesResponse = await axios.get(url);
    console.log(moviesResponse);

    const dataToSend = moviesResponse.data.results.map(object => {
      return new Movies(object);
    });

    response.status(200).send(dataToSend);

  } catch (error) {
    next(error);
  }

};

class Movies {
  constructor(moviesObj) {
    this.date = moviesObj.original_title;
  }
}

module.exports = getMovies;
