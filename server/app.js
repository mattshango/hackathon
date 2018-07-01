var express = require('express');
var app = express();
var router = express.Router();
var db = require('./db');
global.__root   = __dirname + '/'; 

// HEADERS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, x-access-token, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, multipart/form-data');
  res.setHeader('Cache-Control', 'no-cache');
  next();
 });


 // API ROOT
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!'});
});

// CONTROLLERS
var UserController = require(__root + 'controllers/UserController');
router.use('/users', UserController);

var AuthController = require(__root + 'controllers/AuthController');
router.use('/auth', AuthController);

var TaskController = require(__root + 'controllers/TaskController');
router.use('/tasks', TaskController);

var ImageController = require(__root + 'controllers/ImageController');
router.use('/images', ImageController);

var GeneralController = require(__root + 'controllers/GeneralController');
router.use('/general', GeneralController);

// Use our router configuration when we call /api
app.use('/api', router);



module.exports = app;