var express = require("express");
var path = require('path');
var app = require('./app');
var port = process.env.PORT || 3000;

// SERVE BUILD FILES
if(process.env.NODE_ENV == 'production'){
  app.use(express.static(path.join(__dirname, '/../build/')));

  app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, '/../build/', 'index.html'));
  });

  app.get('/login*', function (request, response) {
    response.sendFile(path.join(__dirname, '/../build/', 'index.html'));
  });

  app.get('/register', function (request, response) {
    response.sendFile(path.join(__dirname, '/../build/', 'index.html'));
  });

  app.get('/sports', function (request, response) {
    response.sendFile(path.join(__dirname, '/../build/', 'index.html'));
  });

  app.get('/news', function (request, response) {
    response.sendFile(path.join(__dirname, '/../build/', 'index.html'));
  });

  app.get('/tasks', function (request, response) {
    response.sendFile(path.join(__dirname, '/../build/', 'index.html'));
  });

  app.get('/clothes', function (request, response) {
    response.sendFile(path.join(__dirname, '/../build/', 'index.html'));
  });

  app.get('/photos', function (request, response) {
    response.sendFile(path.join(__dirname, '/../build/', 'index.html'));
  });
}

// START LISTENING TO PORT
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});