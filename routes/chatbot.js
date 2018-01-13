var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('chatbot');
  res.sendStatus(200);
});

module.exports = router;
