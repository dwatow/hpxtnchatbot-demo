'use strict';
const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json());

const request = require('request');

const pageToken = {
    "270024299718336": "EAAaPxZCnJiZCIBAGGzxZBVPnegT78X4v7lrnJQAdQtuFUvjdEpPUnAMPAqMziBMHPIAbH60tkmlZBKgUW1ri7rsX5lqg3ZBSznPjYHsp9z34eUDvqeZA3YrZAjJWEYbt32H7bZCwKmfXK2JZCMyCi1JOYshvIcQlY6XHRvkNiUsPOYQZDZD",
    "552871335047242": "EAACznxPYmxIBAINPpe9alhwvOvujhu3Hb2ZCLfpK1luvQXosjViZAAfbKEFAjYncV7ZCfcqslEOTpYbxbGNGIoQ2G0igQwJZCfkOZCIljUBs0LHztZCtWe9Ozg32GeYY3vWHniiJ47E80IPcKM1BOcuDJfK9XutZBLlMMgTVQkKYAZDZD"
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
    handleTalking(req, res);
});


function handleTalking(req, res) {
    let body = req.body;
    // console.log(body.object);

    // Checks this is an event from a page subscription
    if(body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log('---------------');
            // console.log('webhook event: ');
            console.log(JSON.stringify(webhook_event));
            console.log('---------------');

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            let page_id = webhook_event.recipient.id;
            // console.log('Sender PSID: ' + sender_psid);
            console.log('page_id: ', page_id);


            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function

            // console.log(webhook_event.message);
            // senderAction(page_id, sender_psid, webhook_event.message);

            if(webhook_event.message) {
                console.log('message');
                handleMessage(page_id, sender_psid, webhook_event.message);
            }
            else if(webhook_event.postback) {
                console.log('post back');
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

function senderAction(page_id, sender_psid, received_message) {
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

// Handles messages events
function handleMessage(page_id, sender_psid, received_message) {
    let respons_message = {};

    console.log('handleMessage: ', received_message.text);

    // Check if the message contains text
    if(received_message.text) {


        const msg_text = received_message.text;
        if((/看地圖|找地點|在哪|在哪裡/ig).test(msg_text)) {
            console.log('quick location');

            respons_message["text"] = `在地圖指一下你在哪`
            respons_message["quick_replies"] = [{
                "content_type": "location"
            }]
        }
        else if((/看訊息範本/ig).test(msg_text)) {
            respons_message["text"] = '你想要看哪一種訊息範本？'

            // quick_replies
            respons_message["quick_replies"] = [{
                    "content_type": "text",
                    "title": "一般型範本",
                    "payload": "Generic template",
                    "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "清單範本",
                    "payload": "List template",
                    "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "按鈕範本",
                    "payload": "Button template",
                    "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "開放社交關係圖範本",
                    "payload": "Open Graph template",
                    "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "收據範本",
                    "payload": "Receipt template",
                    "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "航空公司範本",
                    "payload": "Airline templates",
                    "image_url": "https://lorempixel.com/400/200/food/"
                },
                {
                    "content_type": "text",
                    "title": "媒體範本",
                    "payload": "Media template",
                    "image_url": "https://lorempixel.com/400/200/food/"
                }
            ]
        }
        else if((/一般型範本|清單範本|按鈕範本|開放社交關係圖範本|收據範本|航空公司範本|媒體範本/ig).test(msg_text)) {
            let template = {
                "type": "template"
            };
            respons_message["attachment"] = template;

            if(msg_text == "一般型範本") {
                let genericTemplate = {
                    "title": "一般型範本",
                    "image_url": "https://lorempixel.com/400/200/food/",
                    "subtitle": "可以幫助你找到你想找的",
                    "default_action": {
                        "type": "web_url",
                        "url": "https://www.facebook.com/hpxtainan/",
                        "messenger_extensions": false,
                        "webview_height_ratio": "FULL"
                    },
                    "buttons": [{
                            "type": "web_url",
                            "url": "https://www.google.com",
                            "title": "Google",
                        },
                        {
                            "type": "web_url",
                            "url": "https://www.yahoo.com",
                            "title": "Yahoo!",
                        },
                        {
                            "type": "web_url",
                            "url": "https://www.bing.com",
                            "title": "Bing",
                        }
                    ]
                };

                template["payload"] = {
                    "template_type": "generic",
                    "elements": [
                        genericTemplate
                    ]
                };
            }
            else if(msg_text == "清單範本") {
                // let listTemplate = {
                //     "title": "清單範本",
                //     "subtitle": "副標題",
                //     "image_url": "https://lorempixel.com/800/500/food/",
                //     "default_action": {
                //       "title": "Classic T-Shirt Collection",
                //       "subtitle": "See all our colors",
                //       "image_url": "https://www.facebook.com/hpxtainan/",
                //       "buttons": [
                //         {
                //           "title": "View",
                //           "type": "web_url",
                //           "url": "https://www.facebook.com/hpxtainan/",
                //           "messenger_extensions": true,
                //           "webview_height_ratio": "tall",
                //           "fallback_url": "https://www.facebook.com/hpxtainan/"
                //         }
                //       ]
                //     }
                // }

                // let listTemplate2 = {
                //     "title": "Classic Blue T-Shirt",
                //     "image_url": "https://lorempixel.com/800/500/food/",
                //     "subtitle": "100% Cotton, 200% Comfortable",
                //     "default_action": {
                //         "type": "web_url",
                //         "url": "https://www.facebook.com/hpxtainan/",
                //         "messenger_extensions": true,
                //         "webview_height_ratio": "tall",
                //         "fallback_url": "https://www.facebook.com/hpxtainan/"
                //     },
                //     "buttons": [{
                //         "title": "Shop Now",
                //         "type": "web_url",
                //         "url": "https://www.facebook.com/hpxtainan/",
                //         "messenger_extensions": true,
                //         "webview_height_ratio": "tall",
                //         "fallback_url": "https://www.facebook.com/hpxtainan/"
                //     }]
                // }


                template["payload"] = {
                    "template_type": "list",
                    "top_element_style": "large",
                    "elements": [
                        {
                          "title": "有圖有按鈕",
                          "image_url": "https://lorempixel.com/800/500/food/",
                          "subtitle": "See all our colors",
                          "default_action": {
                            "type": "web_url",
                            "url": "https://www.facebook.com/hpxtainan/",
                            "webview_height_ratio": "tall"
                          },
                          "buttons": [
                            {
                              "title": "Shop Now",
                              "type": "web_url",
                              "url": "https://www.facebook.com/hpxtainan/",
                              "webview_height_ratio": "tall"
                            }
                          ]
                        },
                        {
                          "title": "無圖",
                          // "image_url": "https://lorempixel.com/800/500/food/",
                          "subtitle": "100% Cotton, 200% Comfortable",
                          "default_action": {
                            "type": "web_url",
                            "url": "https://www.facebook.com/hpxtainan/",
                            "webview_height_ratio": "tall"
                          },
                          "buttons": [
                            {
                              "title": "Shop Now",
                              "type": "web_url",
                              "url": "https://www.facebook.com/hpxtainan/",
                              "webview_height_ratio": "tall"
                            }
                          ]
                        },
                        {
                          "title": "無按鈕",
                          "image_url": "https://lorempixel.com/800/500/food/",
                          "subtitle": "100% Cotton, 200% Comfortable",
                          "default_action": {
                            "type": "web_url",
                            "url": "https://www.facebook.com/hpxtainan/",
                            "webview_height_ratio": "tall"
                          }
                          // "buttons": [
                          //   {
                          //     "title": "Shop Now",
                          //     "type": "web_url",
                          //     "url": "https://www.facebook.com/hpxtainan/",
                          //     "webview_height_ratio": "tall"
                          //   }
                          // ]
                        }
                    ],
                    "buttons": [{
                      "title": "View More",
                      "type": "postback",
                      "payload": "payload"
                    }]
                }
            }
            else {
                respons_message["text"] = "這個還沒有實作!!!";
            }
        }
        else {
            respons_message["text"] = `回音: "${msg_text}"...`
            // quick_replies
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
                }
            ]
        }
    }
    else if(received_message.attachments) {
        // Gets the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        respons_message = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
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
                    }]
                }
            }
        }
    }

    console.log('-----------------');
    console.log(JSON.stringify(respons_message));
    console.log('-----------------');

    // Sends the response message
    callSendAPI(page_id, sender_psid, respons_message);
}

// Handles messaging_postbacks events
function handlePostback(page_id, sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if(payload === 'yes') {
        response = {
            "text": "Thanks!"
        }
    }
    else if(payload === 'no') {
        response = {
            "text": "Oops, try sending another image."
        }
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
    console.log(request_body);

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
            if (body.error) {
                console.log('error sent!');

                response = {
                    "text": `error type: ${body.error.type} \ncode: ${body.error.code} \nmessage: ${body.error.message}`
                }
                callSendAPI(page_id, sender_psid, response);
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
