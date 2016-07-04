/**
 * Created by jafarnaqvi on 20/04/16.
 */

(function(){

  angular.module('app.idea')
    .controller('SingleIdeaController', SingleIdeaController);

  SingleIdeaController.$inject = ['$routeParams', 'Restangular'];

  function SingleIdeaController($routeParams, Restangular) {

    var utc = this;

    activate();

    function activate() {
      console.log($routeParams.id);

      var baseideas = Restangular.one('idea', $routeParams.id);

      baseideas.get().then(function (idea) {
        console.log(idea);
        utc.idea = idea;
      });
    }
  }

})();

