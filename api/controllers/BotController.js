/**
 * BotController
 *
 * @description :: Server-side logic for managing bots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  receive: function (req, res) {

    res.json({message: 'Hello from bot'});
  },


  verify: function (req, res) {

    console.log(req.body);
    console.log('*');
    console.log(req.body.entry);
    if (req.query['hub.verify_token'] === 'bot_token') {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Error, wrong validation token');
    }


    function checkIfPnr(text) {


      if (text.length === 10) {
        try {
          return !isNaN(Number(text));


        } catch (err) {
          return false;
        }
      }

      return false;
    }


    function handleMessage(messaging, recipent) {

      var msg = messaging.text;

      console.log('inside handle message');

      if (checkIfPnr(msg)) {

        /*Hit the pnr api with this pnr and then send the status to the user.*/

        console.log('inside handle message pnr success');

        NetworkRequestService.getPnr(msg, function (response) {

          console.log('////////////////////');

          response=JSON.parse(response);
          console.log(response);
          console.log(response["response_code"]);
          console.log('////////////////////');

          if (response["response_code"] == 200) {


            var reply = '';

            for (var i = 0; i < response.passengers.length; i++) {
              var passenger = response.passengers[i];

              reply += 'Passenger No:' + passenger.no + ' : ' + passenger.current_status + '\n';
            }

            //  Now send back this variable

            var replyObj = {
              "recipient": {
                "id": recipent
              },
              "message": {
                "text": reply
              }
            };

            NetworkRequestService.botSendReq(replyObj, function (result) {

              console.log('**************************');
              console.log('Response from facebook sending actual pnr');
              console.log(result);
              console.log('**************************');
            });


          }

          else {

            /*Send a failure or please try again message*/

            var text = 'Please send again';

            var replyObj = {
              "recipient": {
                "id": recipent
              },
              "message": {
                "text": text
              }
            };

            NetworkRequestService.botSendReq(replyObj, function (result) {

              console.log('**************************');
              console.log('Response from facebook sending failed pnr request');
              console.log(result);
              console.log('**************************');
            });


          }


        });
      }

      else {

        /*Ask the user to enter PNR number.*/

        var text = 'I do not understand anything else, please send me your PNR number to know the status';

        var replyObj = {
          "recipient": {
            "id": recipent
          },
          "message": {
            "text": text
          }
        };

        NetworkRequestService.botSendReq(replyObj, function (result) {

          console.log('**************************');
          console.log('Response from facebook sending did not understand pnr');
          console.log(result);
          console.log('**************************');
        });


      }


    }

    /*Todo
     * 1-Store the recipent id.
     * 2-Iterate over entry and then iterate over each messaging.
     * 3-If messaging contains message, then extract the text.
     * 4-If text is a pnr, return pnr status.
     * 5-Else Send a text message asking for PNR number.
     * */

    var recipent = req.body.entry[0].messaging[0].sender.id;

    recipent = recipent.toString();
    console.log(recipent);


    console.log('Length of entry:'+req.body.entry.length);
    for (var i = 0; i < req.body.entry.length; i++) {

      console.log('Inside First Loop');
      var oneEntry = req.body.entry[i];


      console.log('Length of message in this entry '+oneEntry.messaging.length);

      for (var j = 0; j < oneEntry.messaging.length; j++) {

        console.log('inside second loop');

        var messaging = oneEntry.messaging[j];
        if (messaging.message.text)
          handleMessage(messaging.message, recipent);
      }
    }

    /*
     var response = {
     "recipient": {
     "id": "997264557024501"
     },
     "message": {
     "text": "hello, world, How are you!"
     }
     };


     NetworkRequestService.botSendReq(response, function (result) {

     console.log('Response from facebook');
     console.log(result);
     console.log('**************************');
     });*/

  }


};

