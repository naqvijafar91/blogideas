/**
 * Created by jafarnaqvi on 20/04/16.
 */

(function() {
  angular.module('app.auth')
    .controller('AuthPageController', AuthPageController);

  AuthPageController.$inject = ['$scope','Restangular', 'VerifyLoginService','$timeout','$location'];
  function AuthPageController($scope,Restangular, VerifyLoginService,$timeout,$location) {

    var utc = this;

    activate();

    function activate() {


      utc.login = function (credentials) {

        VerifyLoginService.login(credentials, function (res) {

          if (res) {

            /*Now redirect the user to the home page*/
            $location.path('/');
          }
                      else
            alert('Not logged in');
        });


      };

      utc.register = function (info) {

        console.log(info);

        if(info.password===info.password1) {

          VerifyLoginService.register(info, function (res) {

            if (res)
              $location.path('/');
            else
              alert('Failed');

          });
        }

        else
          alert('Passwords dont match');

      };


/*

      $timeout(function () {

        var info={
          name:'Jeffery Boycott',
          email:'jeff@xyz.com',
          password:'password'
        };

        VerifyLoginService.login(info,function(res){

          if(res){

          }
          else
            alert('Failed');

        });

      }, 500);
*/

    }


  }

})();
