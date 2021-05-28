const axios = require('axios'); 

async function lookup(){
  const { BB_ENDPOINT, PS5 } = process.env;
  const res = await axios.get(BB_ENDPOINT + PS5)
  return res.data
}

function sendMail(message){
  const { MAIL_DOMAIN, MAIL_API_KEY, MAIL_TO, MAIL_FROM} = process.env;
  const mailgun = require('mailgun-js')({apiKey: MAIL_API_KEY, domain: MAIL_DOMAIN});
  const data = {
    from: MAIL_FROM,
    to: MAIL_TO,
    subject: 'V.0.6',
    text: message
  };
  mailgun.messages().send(data, (error, body) => {
    if (error) console.log('Error:', error)
  });
}

exports.handler = async (event, context) => {
  
  const data = await lookup()
  // const purchasable = data.availabilities[0].shipping.purchasable
  
  sendMail('testing netflify & mailgun')
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}