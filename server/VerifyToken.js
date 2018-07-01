var jwt = require('jsonwebtoken'); 

// JWT SECRET
var SECRET = process.env.SECRET || "APP_SECRET";

function verifyToken(req, res, next) {

  // check header for token
  var token = req.headers['x-access-token'];

  // Return auth false if no token
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, SECRET, function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

    // Save to request
    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;