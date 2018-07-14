// Sends response messages via the Send API
module.exports = function callSendAPI(page_id, sender_psid, respons_message) {
    // console.log('handleMessage call callSendAPI');
    // Construct the message body
    let request_body = {
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": sender_psid
        },
        "message": respons_message
    }
    console.log(JSON.stringify(request_body));

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": {
            "access_token": pageToken[page_id]
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
                callSendAPI(page_id, sender_psid, respons_message);
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
