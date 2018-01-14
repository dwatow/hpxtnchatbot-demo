
const request = require('request');
const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json


app.get('/', function (req, res) {
    res.statusCode = 201;
    res.send('Hallow');
    // console.log(req.body);
});


app.post('/', function (req, res) {

    const url = 'https://graph.facebook.com/v2.6/me/messages?access_token=EAAaPxZCnJiZCIBAN6KP15xd660iz5YBh5Wy4kDNEhHIflmtk8fR1dZB2gYdvtcZC4fHI0rZBGBfl4mZA4v9ZAx4UDBML5rCkk4Vun7lUMnodigokyOfyM9qSjXZBD4JiqIrUnym4SX08ixB8lFNZChVG4fBmCf40jGfeeTZCiTTOMkAwZDZD';
    res.statusCode = 200;

    const messaging = req.body.entry[0].messaging[0]
    const echo = messaging.message.text;

    // res.send(`聊天機器人測試功能: ${echo}`);

    console.log('messaging: ', messaging);
    request({
        url: url,
        method: "POST",
        json: true,
        multipart: {
          "recipient": {
            "id": messaging.sender
          },
          "message": {
            "text": echo
          }
        }
    });
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
