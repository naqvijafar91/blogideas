/**
 * Created by jafarnaqvi on 19/04/16.
 */

(function(){
  angular.module('app.routes')
    .config(['$routeProvider','$locationProvider',
      function ($routeProvider,$locationProvider) {
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/', {
          templateUrl: '/templates/index.html',
          resolve:{
            seo:['$rootScope',function($rootScope){
              $rootScope.title='Awesome App Ideas';
              return true;
            }]
          }
        }).when('/about', {
          templateUrl: '/templates/about.html',
          resolve:{
            seo:['$rootScope',function($rootScope){
              $rootScope.title='About us';
              return true;
            }]
          }
        }).when('/contact', {
          templateUrl: '/templates/contact.html',
          resolve:{
            seo:['$rootScope',function($rootScope){
              $rootScope.title='Contact Us';
              return true;
            }]
          }
        }).when('/post/:id', {
          templateUrl: '/templates/post.html',
          resolve:{
            seo:['$rootScope',function($rootScope){
              $rootScope.title='Reading Zone';
              return true;
            }]
          }
        }).when('/add', {
          templateUrl: '/templates/newPost.html',
          resolve: {
            message: ['VerifyLoginService',function (VerifyLoginService) {
              return VerifyLoginService.checkLogin();
            }],
            seo:['$rootScope',function($rootScope){
              $rootScope.title='Share an idea';
              return true;
            }]
          }
        }).when('/auth', {
          templateUrl: '/templates/auth.html',
          resolve:{
            seo:['$rootScope',function($rootScope){
              $rootScope.title='Join The Revolution';
              return true;
            }]
          }
        }).when('/policy', {
          templateUrl: '/templates/policy.html',
          resolve:{
            seo:['$rootScope',function($rootScope){
              $rootScope.title='Join The Revolution';
              return true;
            }]
          }
        }).otherwise({
          templateUrl: '/templates/404.html',
          caseInsensitiveMatch: true
        })
      }]);

})();
