const axios = require('axios');
const mailgun = require("mailgun-js");

async function lookup(){
  const { BB_ENDPOINT, PS5 } = process.env;
  const res = await axios.get(BB_ENDPOINT + PS5)
  return res.data
}

async function sendMail(message){
  const { MAIL_DOMAIN, MAIL_API_KEY, MAIL_TO, MAIL_FROM} = process.env;
  console.log({ MAIL_DOMAIN, MAIL_API_KEY, MAIL_TO, MAIL_FROM})
  const mail = mailgun({apiKey: MAIL_API_KEY, domain: MAIL_DOMAIN});
  const data = {
    from: MAIL_FROM,
    to: MAIL_TO,
    subject: 'V.0.4',
    text: message
  };
  console.log('about to mail...')
  await mail.messages().send(data, (error, body) => {
    if (error) return console.log('Error:', error.message)
    console.log('Success!', body.message);
  });
  console.log('mail should have sent')
}

exports.handler = async (event, context) => {
  
  const data = await lookup()
  // const purchasable = data.availabilities[0].shipping.purchasable
  
  await sendMail('testing netflify')
  // console.log('mail sent and returning status 200')
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}