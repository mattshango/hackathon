var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Task = require('../models/Task');

// CREATES A NEW TASK
router.post('/', function (req, res) {
  Task.create({
    username : req.body.username,
    task : req.body.task,
    completed : req.body.completed
  }, 
  function (err, task) {
    if (err) return res.status(500).send("There was an issue creating a new task.");

    Task.find({ 'username': task.username }, function (err, tasks) {
      if (err) return res.status(500).send("There was an issues getting all the tasks.");
      res.status(200).send(tasks);
    });
  });
});

// DELETE A TASK
router.delete('/:id/:username', function (req, res) {
  Task.findByIdAndRemove(req.params.id, function (err, task) {
    if (err) return res.status(500).send("There was a problem deleting the task");
    
    Task.find({ 'username': req.params.username }, function (err, tasks) {
      if (err) return res.status(500).send("There was an issues getting all the tasks.");
      res.status(200).send(tasks);
    });
  });
});

// UPDATE A TASK
router.put('/:id', function(req, res) {
  Task.findByIdAndUpdate(req.params.id, {completed: req.body.completed}, {new: true}, function (err, task) {
    if (err) return res.status(500).send("There was a problem updating the task.");

    Task.find({ 'username': req.body.username }, function (err, tasks) {
      if (err) return res.status(500).send("There was an issues getting all the tasks.");
      res.status(200).send(tasks);
    });
  });
})

// GET TASKS BY USER
router.get('/:username', function(req, res) {
  Task.find({ 'username': req.params.username }, function (err, tasks) {
    if (err) return res.status(500).send("There was an issues getting all the tasks.");
    res.status(200).send(tasks);
  });
})

module.exports = router;