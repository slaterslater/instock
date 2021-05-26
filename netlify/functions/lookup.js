const axios = require('axios');

exports.handler = async function(event, context) {
  const { BB_ENDPOINT, PS5 } = process.env;
  const res = await axios.get(BB_ENDPOINT + PS5)
  return {
      statusCode: 200,
      body: JSON.stringify(res.data)
  };
}
