var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

// JWT SECRET
var SECRET = process.env.SECRET || "APP_SECRET";

// LOGIN USER
router.post('/login', function(req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) return res.status(200).send({error: 'Error on the server, please try again'});
    if (!user) return res.status(200).send({error: 'No user found'});
    
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(200).send({error: "Invalid username or password"});

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });
});

// LOGOUT USER
router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

// REGISTER USER
router.post('/register', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    username : req.body.username,
    email : req.body.email,
    password : hashedPassword
  }, 
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.");

    // if user is registered without errors
    // create a token
    var token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });

});

// AUTHENTICATE USER SESSION
router.get('/me', function(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(200).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, SECRET, function(err, decoded) {
    if (err) return res.status(200).send({ auth: false, message: 'Failed to authenticate token.' });
    
    User.findById(decoded.id, 
    { password: 0 }, // projection
    function (err, user) {
      if (err) return res.status(200).send({ auth: false, message: 'There was a problem finding the user.' });
      if (!user) return res.status(200).send({ auth: false, message: 'No user found.'});
      
      next(user); 
    });
  });
});

// MIDDLEWARE
router.use(function (user, req, res, next) {
  res.status(200).send(user);
});

module.exports = router;