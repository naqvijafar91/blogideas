/**
 * Created by jafarnaqvi on 21/04/16.
 */
(function () {


  angular.module('app.navbar')
    .controller('NavBarController', NavBarController);

  NavBarController.$inject = ['$scope','$rootScope','VerifyLoginService','$location'];
  function NavBarController($scope,$rootScope,VerifyLoginService,$location) {

    var um = this;

    activate();

    function activate() {

      um.showLogin=true;



      $rootScope.$on('auth:login',function(event, args){

        console.log('Logged in event received');
        console.log(args);
        um.showLogin=false;
      });

      $rootScope.$on('auth:logout',function(event, args){

        console.log('Logged out event received');
        console.log(args);
        um.showLogin=true;
      });

      $rootScope.location = $location;

      um.logout=function(){

        VerifyLoginService.logout();

      };


      /*First just check user's logged in status
      * IMPORTANT:THIS CODE HAS TO BE THE LAST ONE ANY HOW
      * */

      if(VerifyLoginService.getAdmin()!=undefined)
        $rootScope.$emit('auth:login');
    }

  }


})();
