const mailgun = require("mailgun-js");

function sendMail(message){
  const { MAIL_DOMAIN, MAIL_API_KEY, MAIL_TO, MAIL_FROM} = process.env;
  const mg = mailgun({apiKey: MAIL_API_KEY, domain: MAIL_DOMAIN});
  const data = {
    from: MAIL_FROM,
    to: MAIL_TO,
    subject: 'Hello',
    text: message
  };
  mg.messages().send(data, (error, body) => {
    if (error) console.log('Error:', error.message)
    console.log('Success!', body.message);
  });
}

exports.handler = async (events, context) => {
  const msg = 'using env';
  sendMail(msg)
  
  return {
    statusCode: 200,
    body: JSON.stringify({message: msg})
  }
} 