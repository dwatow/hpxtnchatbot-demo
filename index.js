
const request = require('request');
const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json


app.get('/', function (req, res) {
    res.statusCode = 200;
    res.send('hellow');
    // console.log(req.body);
});


app.post('/', function (req, res) {
    res.statusCode = 200;

    const messaging = req.body.entry[0].messaging[0]
    const echo = messaging.message.text;

    // res.send(`聊天機器人測試功能: ${echo}`);

    console.log('messaging: ', messaging);
    request({
        url: url,
        method: "POST",
        json: {
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
