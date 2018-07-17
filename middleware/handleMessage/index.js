const keywordMap = {
  '看按鈕': require('./selectButtonsTemplates'),
  '看訊息範本': require('./selectTemplates'),
  '看地圖|找地點|在哪|在哪裡': require('./whereAmI'),
  '一般型範本|清單範本|按鈕範本|開放社交關係圖範本|媒體範本|收據範本|航空公司登機證範本|航空公司報到範本|航空公司行程範本|航空公司更新範本': require('./templates'),
  '網址按鈕|回傳按鈕|分享按鈕|購買按鈕|通話按鈕|登入按鈕|登出按鈕|玩遊戲按鈕': require('./buttonTemplates'),
}

function match(keyword, respons_message) {
  for (let pattern in keywordMap) {
    const req = new RegExp(pattern, 'i')
    // console.log(pattern, req.test(keyword));
    if (req.test(keyword)) {
      return keywordMap[pattern](keyword, respons_message)
    }
  }

  respons_message["text"] = `回音: "${keyword}"...`
  // quick_replies
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
  // console.log(respons_message);
  return respons_message
}

// Handles messages events
module.exports = function handleMessage(received_message) {
  let respons_message = {};

  console.log('handleMessage: ', received_message.text);

  // Sends the response message
  // console.log('-----------------');
  // console.log(JSON.stringify(respons_message));
  // console.log('-----------------');

  // Check if the message contains text
  if (received_message.text) {
    return match(received_message.text, respons_message)
  } else if (received_message.attachments) {
    // Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    return {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [{
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  }
}
