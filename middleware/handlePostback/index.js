
const postbackMaps = {
  'no': require('./no'),
  'yes': require('./yes'),
  'other': require('./other')
}

// Handles messaging_postbacks events
module.exports = function handlePostback(received_postback) {
  console.log('> > post back');
  let respons_message;

  // Get the payload for the postback
  let payload = received_postback.payload;
  console.log('> > handlePostback: ', received_postback.payload);



  respons_message = postbackMaps[payload]
  if (respons_message === undefined) {
    respons_message = postbackMaps["other"]
  }

  respons_message["quick_replies"] = [{
      "content_type": "text",
      "title": "看地圖",
      "payload": "看地圖",
      "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "看訊息範本",
      "payload": "template",
      "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "看按鈕",
      "payload": "Buttons",
      "image_url": "https://lorempixel.com/400/200/food/"
    }
  ]
  // Send the message to acknowledge the postback
  return respons_message;
}
