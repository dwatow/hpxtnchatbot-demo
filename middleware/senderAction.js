module.exports = function senderAction(page_id, sender_psid, received_message) {
    // Sends the response message
    let request_body = {
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
    }
    // console.log(request_body);

    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": {
            "access_token": pageToken[page_id]
        },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if(!err) {
            console.log('sender action!');
        }
        else {
            console.error("Unable to send message:" + err);
        }
    });
}
