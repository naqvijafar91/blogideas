/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var status = require("http-status-codes");

var jsonwebtoken = require('jsonwebtoken');
var config = require('./../../config');

function createToken(user) {

  var token = jsonwebtoken.sign({

    id: user.id,
    email: user.email


  }, config.superSecretCustomer);


  return token;


}
module.exports = {

  login: function (req, res) {

    //  Model.find({ where: { name: 'foo' }, skip: 20, limit: 10, sort: 'name DESC' });
    User.findOne({email: req.body.email}).exec(function (err, user) {

      if (!user)
        res.status(status.NOT_FOUND).json({message: 0});

      else {

        /*Now check for correct pwd*/

        if (user.verifyPassword(req.body.password)) {
          res.json({
            message: 1,
            user: user,
            token: createToken(user)
          });
        }

        else
          res.status(status.FORBIDDEN).json({message: 0});
      }

    });
  },

  register: function (req, res) {
    User.create({name:req.body.name, email:req.body.email,password:req.body.password}).exec(function(err,saveduser){

      if(saveduser) {
        res.json({
          message: 1,
          user: saveduser,
          token: createToken(saveduser)
        });

      }
      else if(err)
        res.status(status.INTERNAL_SERVER_ERROR).json(err);
      else
        res.status(status.INTERNAL_SERVER_ERROR).json({message: 0});

    });
  }
};

