'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const verifyToken = require('./controller/verifyToken')
const handleTalking = require('./controller/handleTalking')
require('dotenv').load();

const app = express()

console.log(express().constructor.name);
console.log(app.constructor.name);

app.use(bodyParser.json())

app.get('/', verifyToken);

// Creates the endpoint for our webhook
app.post('/', handleTalking);

console.log(process.env.PORT);


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
