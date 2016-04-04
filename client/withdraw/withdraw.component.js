// withdraw directive
angular.module('simple-todos').directive('withdrawTask', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/withdraw/withdrawTask.html',
    controllerAs: 'withdrawTaskCtrl',
    controller: function ($scope, $reactive) {
      $scope.sites = ["site1", "site2"];
    }
  }
});
