'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const verifyToken = require('./controller/verifyToken')
const handleTalking = require('./controller/handleTalking')
require('dotenv').load();
const app = express()


app.use(bodyParser.json())

app.get('/', verifyToken);
app.post('/', handleTalking);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
