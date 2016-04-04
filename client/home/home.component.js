// Home directive
angular.module('simple-todos').directive('home', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/home/home.html',
    controllerAs: 'homeCtrl',
    controller: function ($scope, $reactive,$meteor) {

      $scope.resetDatabase = function(){
        console.log("calling meteor call");
        $meteor.call('resetDatabase');

      }

      $scope.withdrawTask = function(){
        alert("withdraw");
      };
      $scope.searchTask = function(){
        alert("search");
      };
    }
  }
});
