const request = require('request')
// Sends response messages via the Send API
module.exports = function callSendAPI(sender_psid, respons_message) {
    // console.log('handleMessage call callSendAPI');
    console.log('call send API: ', JSON.stringify(respons_message));
    // Construct the message body
    let request_body = {
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": sender_psid
        },
        "message": respons_message
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": {
          "access_token": process.env.PAGE_ACCESS_TOKEN
        },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if(!err) {
            if(body.error) {
                console.log('error sent!');

                respons_message = {
                    "text": `error type: ${body.error.type} \ncode: ${body.error.code} \nmessage: ${body.error.message}`
                }
                callSendAPI(sender_psid, respons_message);
            }
            else {
                console.log('message sent!');
            }
        }
        else {
            console.error("Unable to send message:" + err);
        }
    });
}
