'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const app = express().use(bodyParser.json())
const verifyToken = require('./controller/verifyToken')
const handleTalking = require('./controller/handleTalking')

const request = require('request');

const pageToken = {
    "270024299718336": "EAAaPxZCnJiZCIBAGGzxZBVPnegT78X4v7lrnJQAdQtuFUvjdEpPUnAMPAqMziBMHPIAbH60tkmlZBKgUW1ri7rsX5lqg3ZBSznPjYHsp9z34eUDvqeZA3YrZAjJWEYbt32H7bZCwKmfXK2JZCMyCi1JOYshvIcQlY6XHRvkNiUsPOYQZDZD",
    "552871335047242": "EAACznxPYmxIBAINPpe9alhwvOvujhu3Hb2ZCLfpK1luvQXosjViZAAfbKEFAjYncV7ZCfcqslEOTpYbxbGNGIoQ2G0igQwJZCfkOZCIljUBs0LHztZCtWe9Ozg32GeYY3vWHniiJ47E80IPcKM1BOcuDJfK9XutZBLlMMgTVQkKYAZDZD"
}

app.get('/', verifyToken);

// Creates the endpoint for our webhook
app.post('/', handleTalking);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
