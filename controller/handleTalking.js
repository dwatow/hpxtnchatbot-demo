const senderAction = require('../middleware/senderAction')
const handleMessage = require('../middleware/handleMessage')
const handlePostback = require('../middleware/handlePostback')
const callSendAPI = require('../middleware/callSendAPI')

// module.exports = function handleTalking (req, res) {
//     userTalking(req, res);
// }

module.exports = function userTalking(req, res) {
  let body = req.body;
  // console.log(body.object);

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging.shift();

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      senderAction(sender_psid);
      // let page_id = webhook_event.recipient.id;
      console.log('Sender PSID: ' + sender_psid);
      // console.log('page_id: ', page_id);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function

      // console.log(webhook_event.message);
      // var message = {
      //   text: webhook_event.message.text
      // }
      console.log(webhook_event.message);

      var respons_message;
      if (webhook_event.message) {
        console.log('message');
        respons_message = handleMessage(webhook_event.message);
      } else if (webhook_event.postback) {
        console.log('post back');
        respons_message = handlePostback(webhook_event.postback);
      }
      callSendAPI(sender_psid, respons_message);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
}
