/**
 * Created by jafarnaqvi on 20/04/16.
 */

var config = require('../../config');
//var Admin = require('../../model/admin');

var jsonwebtoken = require('jsonwebtoken');
module.exports = function auth (req, res, next) {



  var token = req.param('token') || req.headers['x-access-token'];
  console.log("Somebody just came to our app!:"+token);

  // check if token exist
  if (token) {

    //Check if its an internal token or else procees with the flow
    if(token==='internal') {
      console.log('internal api hit');
      next();
    }

    else {
      jsonwebtoken.verify(token, config.superSecretCustomer, function (err, decoded) {

        if (err) {

          //Now verify for customer
          res.status(403).send({success: false, message: "Failed to authenticate user"});

        } else {

          //
          req.decoded = decoded;
          //console.log(decoded);

          //This is how you pass data from policies to blueprint routes in sails
          req.options.values = req.options.values || {};
          req.options.values.owner=decoded.id;
          next();
        }
      });
    }


  } else {
    res.status(403).send({success: false, message: "No Token Provided"});
  }
};
