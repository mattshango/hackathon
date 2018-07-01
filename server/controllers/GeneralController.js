var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const request = require('request');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// GET NEWS
router.get('/news', function (req, res) {
  request('http://feeds.bbci.co.uk/news/rss.xml', (err, response, body) => {
    if (err) return res.status(500).send("There was an issue getting the news.");
    res.status(200).send(body)
  });
});

// GET CLOTHES
router.get('/clothes/:username', function (req, res) {
  request('https://therapy-box.co.uk/hackathon/clothing-api.php?username='+req.params.username, (err, response, body) => {
    if (err) return res.status(500).send("There was an issue getting the clothes.");
    res.status(200).send(body)
  });
});

router.get('/clothes/', function (req, res) {
  request('https://therapy-box.co.uk/hackathon/clothing-api.php?username=', (err, response, body) => {
    if (err) return res.status(500).send("There was an issue getting the clothes.");
    res.status(200).send(body)
  });
});

// GET WEATHER
router.get('/weather/:secret', function (req, res) {
  request('https://api.openweathermap.org/data/2.5/weather?q=London&appid='+req.params.secret, (err, response, body) => {
    if (err) return res.status(500).send("There was an issue getting the weather.");
    res.status(200).send(body)
  });
});


module.exports = router;