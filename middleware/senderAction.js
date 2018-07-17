const request = require('request')

module.exports = function senderAction(sender_psid) {
  // Sends the response message

  let request_body = {
    "messaging_type": "RESPONSE",
    "recipient": {
      "id": sender_psid
    },
    "sender_action": "typing_on"
  }

  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": {
      "access_token": process.env.PAGE_ACCESS_TOKEN
    },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {

      if(body.error) {
          console.log('error sent!');

          respons_message = {
              "text": `error type: ${body.error.type} \ncode: ${body.error.code} \nmessage: ${body.error.message}`
          }
          callSendAPI(sender_psid, respons_message);
      }
      else {
        console.log('sender action!');
      }
    } else {
      console.error("Unable to send message:" + err);
    }
  });
}


/*

curl -X POST -H "Content-Type: application/json" -d '{
  "recipient":{
    "id":"270024299718336"
  },
  "message":{
    "attachment":{
      "type":"image",
      "payload":{
        "attachment_id": "1745504518999123"
      }
    }
  }
}' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"
*/
