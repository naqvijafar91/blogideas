/**
 * Created by jafarnaqvi on 19/04/16.
 */

(function () {

  angular.module('app.poster')
    .controller('PostPageController', PostPageController);

  PostPageController.$inject = ['Restangular','$location','ngDialog'];

  function PostPageController(Restangular,$location,ngDialog) {
    var utc = this;

    activate();

    function activate(){

      var baseidea = Restangular.all('idea');

      utc.newPost={};

      var template="<h1>Template heading</h1><p>Content goes here</p>";

      utc.requestApproval=function(data){

        /*Create a new idea*/

        console.log('Button clicked:'+data);
        console.log(data);

        baseidea.post(data).then(function(response){
          console.log(response);
        //  Now we need to keep everything blank again and show a success alert to the user
          utc.newPost={};
          //ngDialog.open({ template: 'templates/dialog.html', className: 'ngdialog-theme-plain' });
          //$location.path('/post/'+response.id);
          ngDialog.open({
            template: 'templateId', className:'ngdialog-theme-default'
          });

        },function(err){
          console.log('Error while posting');
          console.log(err);
          alert('Please fill in all the fields');
        });


      }
    }

  }
})();


