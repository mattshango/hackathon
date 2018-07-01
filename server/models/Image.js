var mongoose = require('mongoose');  

var ImageSchema = new mongoose.Schema({  
  username: String,
  imageUrl: String,
});
mongoose.model('Image', ImageSchema);

module.exports = mongoose.model('Image');