/**
 * Created by jafarnaqvi on 15/03/16.
 */
(function () {
  'use strict';

  angular
    .module('app.auth')
    .service('VerifyLoginService', verifyLoginService);

  verifyLoginService.$inject = ['$http', '$q', '$timeout', '$cookies', '$location', 'Restangular','$rootScope'];
  function verifyLoginService($http, $q, $timeout, $cookies, $location, Restangular,$rootScope) {

    var verifyLoginService = this;

    var User = {};


    $rootScope.$on('auth:login',function(event, args){

      //Now set the default header
      Restangular.setDefaultHeaders({'x-access-token':verifyLoginService.getToken()});

    });

    verifyLoginService.login = function (data, successcallback) {

      /*       var data = {
       "username": "jafar91250",
       "password": "password"
       };*/

      var baselogin = Restangular.all('user/login');

      baselogin.post(data).then(function (result) {
        console.log(result);
        $cookies.putObject('AUTH', result);
        console.log('setting token:'+verifyLoginService.getToken());
        //Now broadcast an event
        //$rootScope.$emit('loggedIn');
        $rootScope.$emit('auth:login',result);
        successcallback(true);
      }, function (err) {
        successcallback(false);

      });
    };

    verifyLoginService.logout = function () {

      $cookies.remove("AUTH");
      $rootScope.$emit('auth:logout');
      $location.path('/');
    };

    verifyLoginService.getAdmin = function () {

      return $cookies.getObject('AUTH');
    };


    verifyLoginService.checkLogin = function () {
      //console.log('Inside Resolve');
      var deferred = $q.defer();
      $timeout(function () {

        /*Check for login cookie*/
        if (verifyLoginService.getAdmin() === undefined) {
          deferred.reject('Not Logged In');
          alert('please login to continue');
          $location.path('/auth');
        }
        else
          deferred.resolve('Great');


      }, 1);
      return deferred.promise;
    };


    verifyLoginService.getToken = function() {

      var user=verifyLoginService.getAdmin();
      if(user) {

        return user.token;
      }

      else
        return false;
    };


    verifyLoginService.register=function(data,callback){

      var baseRegister = Restangular.all('user/register');

      baseRegister.post(data).then(function (result) {
        console.log(result);
        $cookies.putObject('AUTH', result);
        $rootScope.$emit('auth:login',result);
        callback(true);
      }, function (err) {
        callback(false);

      });
    };


  }


})();
