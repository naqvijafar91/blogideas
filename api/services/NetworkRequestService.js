/**
 * Created by jafarnaqvi on 06/05/16.
 */

var request = require('request');
var config = require('./../../config');
module.exports = {

  getPnr: function (pnr, callback) {

    request({
        method: 'GET',
        url: 'http://api.railwayapi.com/pnr_status/pnr/'+pnr+'/apikey/movwa5589/'

      }
      , function (error, response, body) {

        console.log('****');
        console.log(body);
        console.log('****');
        if (!error && response.statusCode == 200) {

          callback(body);
        }
        else
          callback(false, error, response);

      });
  },


  botSendReq: function (object, callback) {

    request({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAAYRbi5mLGcBABbc03TObMe4U97OV5L9ubYGeCIRhVQvmtZA0eqG6Ovct5EGJZCfxgwZAjkHotF5aKBD2UEXPSrG4kCGYwA8qkmlvsTjbN8QRfX9wSQsd4pUCZAoSE7laf9yJ96lvq8f0bmljUlMRBvK6hfZC5lx5vQLXCd3XFAZDZD',
        json: object


      }
      , function (error, response, body) {

        //console.log(error);
        //console.log(response);

        console.log(body);
        callback(body[0]);

      });

  }
};
