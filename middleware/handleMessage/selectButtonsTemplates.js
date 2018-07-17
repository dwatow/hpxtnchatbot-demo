module.exports = function(msg_text, respons_message) {
  respons_message["text"] = '你想要看哪一種按鈕？'

  // quick_replies
  respons_message["quick_replies"] = [{
      "content_type": "text",
      "title": "網址按鈕",
      "payload": "URL Button",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "回傳按鈕",
      "payload": "Postback Button",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "分享按鈕",
      "payload": "Share Button",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "購買按鈕",
      "payload": "Buy Button",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "通話按鈕",
      "payload": "Call Button",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "登入按鈕",
      "payload": "Log In Button",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "登出按鈕",
      "payload": "Log Out Button",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "玩遊戲按鈕",
      "payload": "Game Play Button",
      // "image_url": "https://lorempixel.com/400/200/food/"
    }
  ]
  return respons_message
}
