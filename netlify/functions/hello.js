const axios = require('axios');
const BB_API = 'https://www.bestbuy.ca/ecomm-api/availability/products/';
const PS5 = '14962185';

exports.handler = async function(event, context) {
  const res = await axios.get(BB_API + PS5)
  // console.log(res.data)
  return {
      statusCode: 200,
      body: JSON.stringify(res.data)
      // body: JSON.stringify({message: "Hello World"})
  };
}