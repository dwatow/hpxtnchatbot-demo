/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * Starter Project for Messenger Platform Quick Start Tutorial
 *
 * Use this project as the starting point for following the
 * Messenger Platform quick start tutorial.
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 */

'use strict';

// Imports dependencies and set up http server
const
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 3000, () => console.log('webhook is listening'));

// Accepts POST requests at /webhook endpoint
app.post('/', (req, res) => {
  const VERIFY_TOKEN = "EAAaPxZCnJiZCIBAEVQletmgFhs3vNkISZC08bQW95WzXGuSWKshRJarUZAM8o17lQ8bUMZAjmfwD9BoyZBb3Wp1fGMKZBopKUTnI0ZBsF1hZACAzIZC6xZCvzzZBxfCpqQXxERjV1dHzQIP7sMYMWxJ71uDEQ0Jbi9qvLPeuT9Vc5F3LOAZDZD";

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Get the webhook event. entry.messaging is an array, but
      // will only ever contain one event, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      request({
        // "messaging_type": "<MESSAGING_TYPE>",
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "recipient": {
          "id": "1555445211145246"
        },
        "message": {
          "text": "hello, world!"
        }
      }, (err, res, body) => {
        if (!err) {

          if (body.error) {
            console.log('error sent!');

            respons_message = {
              "text": `error type: ${body.error.type} \ncode: ${body.error.code} \nmessage: ${body.error.message}`
            }
            callSendAPI(sender_psid, respons_message);
          } else {
            console.log('sender action!');
          }
        } else {
          console.error("Unable to send message:" + err);
        }
      });

    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Accepts GET requests at the /webhook endpoint
app.get('/', (req, res) => {

  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = "chris";

  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Check if a token and mode were sent
  if (mode && token) {

    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
