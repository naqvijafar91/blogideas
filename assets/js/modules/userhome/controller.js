/**
 * Created by jafarnaqvi on 20/04/16.
 */

(function () {


  angular.module('app.userhome')
    .controller('UserHomeController', UserHomeController);

  UserHomeController.$inject = ['Restangular'];

  function UserHomeController(Restangular) {

    var utc = this;

    activate();

    function activate() {

      utc.heading = 'Awesome Ideas';
      utc.secondHeading = 'A platform to help build the solution to your problems';


      /*Fetch all the posts for this user*/
      var baseideas = Restangular.all('idea');

      var skipCount = 0;
      baseideas.getList({limit: 5}).then(function (ideas) {
        //console.log(workspaceDetails);
        utc.ideas = ideas;
      });


      utc.loadmore = function () {

        /*This function will load next 10 idea posts and update our utc.ideas array*/
        baseideas.getList({skip: 5 + skipCount, limit: 5}).then(function (ideas) {
          console.log(ideas);
          if (ideas.length == 0) {
            alert('No more ideas');
          }
          else {
            utc.ideas = ideas;
            skipCount += 5;
          }

        });

      };


    }

  }


})();
