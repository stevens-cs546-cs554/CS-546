const axios = require('axios');

async function getApiData() {
  //try removing the await keyword and run the application
  let { data } = await axios.get('http://api.tvmaze.com/shows');

  return data;
}

module.exports = { getApiData };
