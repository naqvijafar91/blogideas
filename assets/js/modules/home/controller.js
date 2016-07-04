/**
 * Created by jafarnaqvi on 19/04/16.
 */
angular.module('app.home')
  .controller('HomePageController', HomePageController);

HomePageController.$inject = ['Restangular','$rootScope'];

function HomePageController(Restangular,$rootScope) {
  var utc = this;

  activate();

  function activate(){

    $rootScope.title='Awesome App Ideas';
    utc.heading='Awesome Ideas';
    utc.secondHeading='A platform to help build the solution to your problems';

    var baseideas = Restangular.all('idea');

    var skipCount=0;
    baseideas.getList({limit:5,approved:true}).then(function (ideas) {
      //console.log(workspaceDetails);
      utc.ideas = ideas;
    });

    utc.loadmore=function(){

      /*This function will load next 10 idea posts and update our utc.ideas array*/
      baseideas.getList({skip: 5+skipCount,limit:5,approved:true}).then(function (ideas) {
        console.log(ideas);
        if(ideas.length==0) {
            alert('No more ideas');
        }
        else {
          utc.ideas = ideas;
          skipCount+=5;
        }

      });

    };
  }

}
