'use strict';
const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json());

const request = require('request');

const pageToken = {
    // "552871335047242": "EAAaPxZCnJiZCIBALw0ftSE1bzG9GK6NY60x9QTTAaoTFZBSqwucuRXz0VAxWd0X4STzYbS9EUnmamqwL3RrvXeOQNpx1Wx9Tz1ZAiOhfXZA21DthVMuCZAcfESdhWO5zO4Mvgj9dlE70MUvPEGCdyZArS71CkvnFlkL2uHCbBHAZBwZDZD",
    "270024299718336": "EAAaPxZCnJiZCIBAGGzxZBVPnegT78X4v7lrnJQAdQtuFUvjdEpPUnAMPAqMziBMHPIAbH60tkmlZBKgUW1ri7rsX5lqg3ZBSznPjYHsp9z34eUDvqeZA3YrZAjJWEYbt32H7bZCwKmfXK2JZCMyCi1JOYshvIcQlY6XHRvkNiUsPOYQZDZD",
    "552871335047242": "EAACznxPYmxIBAEuZCkojFoo2Rb3ay3ZCb1ldESS8fgakTKcY2ZC7LLGHcI4y8TpgKMq73FEGACEMgfn0ccMuL9WaHbRG3taWYdfgLx11Yr8bctn9Yyd17ZAOi8ZCSCIn6yhC8aZAygZC516MzunaAxrDF4ZC6ljeGZB1CTdUWS6UaOgZDZD"
}

app.get('/', verifyToken);

function verifyToken(req, res) {
    let VERIFY_TOKEN = "chris"

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];


    // Checks if a token and mode is in the query string of the request
    if(mode && token) {

        // Checks the mode and token sent is correct
        if(mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        }
        else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
    else {
        res.status(200).send('Hello world');
    }
}

// Creates the endpoint for our webhook
app.post('/', (req, res) => {
    messagingHandler(req, res);
});


function messagingHandler(req, res) {
    let body = req.body;
    // console.log(body.object);

    // Checks this is an event from a page subscription
    if(body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            // console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            let page_id = webhook_event.recipient.id;
            // console.log('Sender PSID: ' + sender_psid);
            console.log('page_id: ', page_id);


            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            // console.log(webhook_event.message);
            senderAction(page_id, sender_psid, webhook_event.message);

            if(webhook_event.message) {
                handleMessage(page_id, sender_psid, webhook_event.message);
            }
            else if(webhook_event.postback) {
                handlePostback(page_id, sender_psid, webhook_event.postback);
            }
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    }
    else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
}

function senderAction (page_id, sender_psid, received_message) {
    // Sends the response message
    let request_body = {
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
    }
    console.log(request_body);

    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": {
            "access_token": pageToken[page_id]
        },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if(!err) {
            console.log('message sent!')
        }
        else {
            console.error("Unable to send message:" + err);
        }
    });
}

// Handles messages events
function handleMessage(page_id, sender_psid, received_message) {
    let response;

    console.log('handleMessage: ', received_message.text);

    // Check if the message contains text
    if(received_message.text) {
        // Create the payload for a basic text message
        response = {
            "text": `回音: "${received_message.text}"...`
        }
    }
    else if(received_message.attachments) {
        // Gets the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
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
                        }
                    ]
                }
            }
        }
    }

    // Sends the response message
    callSendAPI(page_id, sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(page_id, sender_psid, received_postback) {
    let response;

     // Get the payload for the postback
     let payload = received_postback.payload;

     // Set the response based on the postback payload
     if (payload === 'yes') {
       response = { "text": "Thanks!" }
     } else if (payload === 'no') {
       response = { "text": "Oops, try sending another image." }
     }
     // Send the message to acknowledge the postback
     callSendAPI(page_id, sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(page_id, sender_psid, response) {
    // console.log('handleMessage call callSendAPI');
    // Construct the message body
    let request_body = {
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

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
            console.log('message sent!')
        }
        else {
            console.error("Unable to send message:" + err);
        }
    });
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
