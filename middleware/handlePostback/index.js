const callSendAPI = require('../senderAction')
// Handles messaging_postbacks events
module.exports = function handlePostback(page_id, sender_psid, received_postback) {
    let respons_message;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the respons_message based on the postback payload
    if(payload === 'yes') {
        respons_message = {
            "text": "Thanks!"
        }
    }
    else if(payload === 'no') {
        respons_message = {
            "text": "Oops, try sending another image."
        }
    }
    else {
        respons_message = {
            "text": "沒有處理這個 payload 的 code"
        }
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
    callSendAPI(page_id, sender_psid, respons_message);
}
