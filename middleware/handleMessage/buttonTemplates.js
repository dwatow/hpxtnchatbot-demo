module.exports = function(msg_text, respons_message) {
  let template = {
    "type": "template"
  };
  respons_message["attachment"] = template;

  if (msg_text === "網址按鈕") {
    const urlButtonGoogle = {
      "type": "web_url",
      "url": "https://www.google.com",
      "title": "Goodle(full)",
      "webview_height_ratio": "full"
    }

    const urlButtonYahoo = {
      "type": "web_url",
      "url": "https://www.yahoo.com",
      "title": "Yahoo!(compact)",
      "webview_height_ratio": "compact"
    }

    const urlButtonBing = {
      "type": "web_url",
      "url": "https://www.bing.com",
      "title": "Bing(tall)",
      "webview_height_ratio": "tall"
    }

    template["payload"] = {
      "template_type": "button",
      "text": "網址按鈕!!",
      "buttons": [
        urlButtonGoogle,
        urlButtonBing,
        urlButtonYahoo
      ]
    }
  } else if (msg_text === "回傳按鈕") {
    const payloadButton = {
      "type": "postback",
      "title": "回傳按鈕1",
      "payload": "PAYLOAD_STRING"
    }
    template["payload"] = {
      "template_type": "button",
      "text": "回傳按鈕!!",
      "buttons": [
        payloadButton,
        payloadButton,
        payloadButton
      ]
    }
  } else if (msg_text === "分享按鈕") {
    const share = {
      "type": "element_share"
    }
    template["payload"] = {
      "template_type": "generic",
      "elements": [{
        "title": "這是?",
        "subtitle": "你覺得？",
        "image_url": "https://lorempixel.com/800/800/food/",
        "buttons": [
          share
        ],
      }]
    }
  }
  // else if (msg_text === "購買按鈕") {
  // }
  else if (msg_text === "通話按鈕") {
    const phoneNumberButton = {
      "type": "phone_number",
      "title": "聖凱的手機",
      "payload": "0921026229"
    }
    template["payload"] = {
      "template_type": "button",
      "text": "通話按鈕(小心使用)",
      "buttons": [
        phoneNumberButton,
        phoneNumberButton,
        phoneNumberButton
      ]
    }
  }

  // else if (msg_text === "登入按鈕") {
  // }
  // else if (msg_text === "登出按鈕") {
  // }
  // else if (msg_text === "玩遊戲按鈕") {
  // }
  else {
    respons_message["text"] = "這個還沒有實作!!!";
    delete respons_message.attachment;
  }
  return respons_message

  // respons_message["quick_replies"] = [{
  //         "content_type": "text",
  //         "title": "看地圖",
  //         "payload": "看地圖",
  //         "image_url": "https://lorempixel.com/400/200/food/"
  //     },
  //     {
  //         "content_type": "text",
  //         "title": "看訊息範本",
  //         "payload": "template",
  //         "image_url": "https://lorempixel.com/400/200/food/"
  //     },
  //     {
  //         "content_type": "text",
  //         "title": "看按鈕",
  //         "payload": "Buttons",
  //         "image_url": "https://lorempixel.com/400/200/food/"
  //     }
  // ]
}
