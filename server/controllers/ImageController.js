var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var cloudinary = require('cloudinary');

// CLOUDINARY CONFIG
cloudinary.config({ 
  cloud_name: 'CLOUD_NAME', 
  api_key: 'API_KEY', 
  api_secret: 'API_SECRET' 
});


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Image = require('../models/Image');

// UPLOAD CONFIG 
var storage = multer.diskStorage({
  destination: './temp',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage });

// UPLOAD IMAGE
router.post('/:username', upload.single('file'), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) { 
    var fileLocation = "./temp/"+result.original_filename+"."+result.format
    
    // Remove image file just created
    fs.unlink(fileLocation, () => {
      Image.create({
        username : req.params.username,
        imageUrl : result.secure_url
      }, 
      function (err, image) {
        if (err) return res.status(500).send("There was an issue uploading a new image.");
    
        Image.find({ 'username': image.username }, function (err2, Images) {
          if (err2) return res.status(500).send("There was an issues getting all the images.");
          res.status(200).send(Images);
        });
      });
    });
  });
  
});

// GET IMAGES BY USER
router.get('/:username', function(req, res) {
  Image.find({ 'username': req.params.username }, function (err, Images) {
    if (err) return res.status(500).send("There was an issues getting all the images.");
    res.status(200).send(Images);
  })
})


module.exports = router;