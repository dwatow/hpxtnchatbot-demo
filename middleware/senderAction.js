const request = require('request')
// const PAGE_ACCESS_TOKEN = ;

module.exports = function senderAction(sender_psid, received_message) {
  // Sends the response message
  let request_body = {
    "messaging_type": "RESPONSE",
    "recipient": {
      "id": sender_psid
    },
    "message": received_message,
    // "sender_action": "typing_on"
  }
  // console.log(process.env.PAGE_ACCESS_TOKEN);
  // console.log(PAGE_ACCESS_TOKEN);

  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": {
      "access_token": process.env.PAGE_ACCESS_TOKEN
    },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('sender action!');
      console.log(body);
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
