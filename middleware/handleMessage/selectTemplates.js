module.exports = function(msg_text, respons_message) {
  respons_message["text"] = '你想要看哪一種訊息範本？'

  // quick_replies
  respons_message["quick_replies"] = [{
      "content_type": "text",
      "title": "一般型範本",
      "payload": "Generic template",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "清單範本",
      "payload": "List template",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "按鈕範本",
      "payload": "Button template",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "開放社交關係圖範本",
      "payload": "Open Graph template",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "收據範本",
      "payload": "Receipt template",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "航空公司登機證範本",
      "payload": "Airline templates",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "航空公司報到範本",
      "payload": "Airline templates",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "航空公司行程範本",
      "payload": "Airline templates",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "航空公司更新範本",
      "payload": "Airline templates",
      // "image_url": "https://lorempixel.com/400/200/food/"
    },
    {
      "content_type": "text",
      "title": "媒體範本",
      "payload": "Media template",
      // "image_url": "https://lorempixel.com/400/200/food/"
    }
  ]
  return respons_message
}
