const axios = require('axios');
const mailgun = require("mailgun-js");

async function lookup(){
  const { BB_ENDPOINT, PS5 } = process.env;
  const res = await axios.get(BB_ENDPOINT + PS5)
  return res.data
}

function sendMail(message){
  const { MAIL_DOMAIN, MAIL_API_KEY, MAIL_TO, MAIL_FROM} = process.env;
  const mg = mailgun({apiKey: MAIL_API_KEY, domain: MAIL_DOMAIN});
  const data = {
    from: MAIL_FROM,
    to: MAIL_TO,
    subject: 'V1',
    text: message
  };
  mg.messages().send(data, (error, body) => {
    if (error) console.log('Error:', error.message)
    console.log('Success!', body.message);
  });
}

exports.handler = async (event, context) => {
  
  const data = await lookup()
  // const purchasable = data.availabilities[0].shipping.purchasable

  sendMail('deployed to netlify')

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}