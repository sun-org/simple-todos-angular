// search directive
angular.module('simple-todos').directive('searchTask', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/seach/searchTask.html',
    controllerAs: 'searchTaskCtrl',
    controller: function ($scope, $reactive) {
      $scope.sites = ["site1", "site2"];
    }
  }
});
