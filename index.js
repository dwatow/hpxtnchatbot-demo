const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json());

const request = require('request');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || "EAAaPxZCnJiZCIBABLoK5pguCxfoELCYTu8nZC9ZA1jtXLVIdFAebWUt8FgcpG5ibnVg9sCN1Lx4wry0BX5IkRrsUN2p872yrVALhQgjwl5thBW05ZA3AiS9p8pg9wOe4Jhx3QeJubIT3HWZAopzNZASy3vzCCZC5ypmTZBWfcmiZAm5AZDZD";

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
    console.log('POST');
    messagingHandler(req, res);
});

function messagingHandler(req, res) {
    let body = req.body;
    console.log(body.object);

    // Checks this is an event from a page subscription
    if(body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);


            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            console.log(webhook_event.message);
            if(webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            }
            else if(webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
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

// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

    console.log('handleMessage: ', received_message.text);
    // Check if the message contains text
    if(received_message.text) {

        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }

        // Sends the response message
        callSendAPI(sender_psid, response);
    }
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    console.log('handleMessage call callSendAPI');
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    console.log('callSendAPI: ', request_body);
    console.log('token', PAGE_ACCESS_TOKEN);


    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages?access_token=" + PAGE_ACCESS_TOKEN,
        // "qs": {
        //     "access_token": PAGE_ACCESS_TOKEN
        // },
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
