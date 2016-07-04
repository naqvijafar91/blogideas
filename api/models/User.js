/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');
var uuid = require('node-uuid');
var SALT_WORK_FACTOR = 10;

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required:true
    },
    email: {
      type: 'string',
      required:true,
      unique: true
    },

    password: {
      type: 'string',
      required:true
    },
// Add a reference to Idea
    ideas: {
      collection: 'idea',
      via: 'owner'
    },

    likes: {

      collection: 'idea',
      via: 'likers',
      dominant: true
    },

    verifyPassword: function (password) {
      if (password === undefined)
        return false;
      var a = bcrypt.compareSync(password, this.password);
      return a;
    },

    changePassword: function (newPassword, cb) {
      this.newPassword = newPassword;
      this.save(function (err, u) {
        return cb(err, u);
      });
    },

    toJSON: function () {
      var obj = this.toObject();
      return obj;
    }
  },

  beforeCreate: function (attrs, cb) {
    bcrypt.hash(attrs.password, SALT_WORK_FACTOR, function (err, hash) {
      attrs.password = hash;
      return cb();
    });
  },

  beforeUpdate: function (attrs, cb) {
    User.findOne(attrs.id).exec(function (err, user) {

      if (user) {

        if (user.password != attrs.password) {
          console.log('New password goint to hash it');
          bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return cb(err);

            bcrypt.hash(attrs.password, salt, function (err, crypted) {
              if (err) return cb(err);

              delete attrs.password;
              attrs.password = crypted;
              return cb();
            });
          });
        }

        else
          return cb();

      }

    });
    /*    if (attrs.password && attrs.password!=this.password) {
     console.log('New password goint to hash it');
     bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
     if (err) return cb(err);

     bcrypt.hash(attrs.password, salt, function (err, crypted) {
     if (err) return cb(err);

     delete attrs.password;
     attrs.password = crypted;
     return cb();
     });
     });
     }

     else {
     return cb();
     }*/
  }
}
;

