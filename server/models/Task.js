var mongoose = require('mongoose');  

var TaskSchema = new mongoose.Schema({  
  username: String,
  task: String,
  completed: Boolean
});
mongoose.model('Task', TaskSchema);

module.exports = mongoose.model('Task');