const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json());

const request = require('request');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.get('/', function (req, res) {
    res.statusCode = 200;
    verifyToken(req, res);
    res.send('Hallow');
    // console.log(req.body);
});

//
// app.post('/', function (req, res) {
//
//     const url = 'https://graph.facebook.com/v2.6/me/messages?access_token=EAAaPxZCnJiZCIBAN6KP15xd660iz5YBh5Wy4kDNEhHIflmtk8fR1dZB2gYdvtcZC4fHI0rZBGBfl4mZA4v9ZAx4UDBML5rCkk4Vun7lUMnodigokyOfyM9qSjXZBD4JiqIrUnym4SX08ixB8lFNZChVG4fBmCf40jGfeeTZCiTTOMkAwZDZD';
//     res.statusCode = 200;
//
//     const messaging = req.body.entry[0].messaging[0]
//     const echo = messaging.message.text;
//
//     // res.send(`聊天機器人測試功能: ${echo}`);
//
//     console.log('messaging: ', messaging);
//     request({
//         url: url,
//         method: "POST",
//         json: true,
//         multipart: {
//           "recipient": {
//             "id": messaging.sender
//           },
//           "message": {
//             "text": echo
//           }
//         }
//     });
// });

// Creates the endpoint for our webhook
app.post('/', (req, res) => {
    messagingHandler(req, res);
});

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
}

function messagingHandler(req, res) {
    let body = req.body;

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


    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.9/me/messages",
        "qs": {
            "access_token": PAGE_ACCESS_TOKEN
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
