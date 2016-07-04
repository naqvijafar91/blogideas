/**
 * IdeaController
 *
 * @description :: Server-side logic for managing Ideas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var status = require("http-status-codes");

module.exports = {

  like:function(req,res){
    /*This controller will add this user in like*/

    var ownerid=req.decoded.id;
    var postid=req.body.postid;
    User.findOne(ownerid).exec(function(err, user) {
      if(err) // handle error
            res.status(status.INTERNAL_SERVER_ERROR).json(err);

      if(user) {
        // Queue up a record to be inserted into the join table
        console.log('User Found:'+user);
        user.likes.add(postid);

        // Save the user, creating the new associations in the join table
        user.save(function(err) {

          if(!err) {

            res.json({message:1});
          }

          else
            res.status(status.INTERNAL_SERVER_ERROR).json(err);
        });
      }
      else
        res.status(status.NOT_FOUND).json({message:0});

    });
  }
};

