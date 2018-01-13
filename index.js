
// const request = require('request');
const PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();

app.get('/name', function (req, res) {
    res.statusCode = 200;
    res.send('hellow');
    console.log(req.body);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
