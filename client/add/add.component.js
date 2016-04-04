// add task directive
angular.module('simple-todos').directive('addTask', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/add/addTask.html',
    controllerAs: 'addTaskCtrl',
    controller: function ($scope, $reactive, $meteor) {
      $scope.quantity = 10;

      Tracker.autorun(function(){
        Meteor.subscribe("sites", function(){
          $scope.sites = Sites.find().fetch();
          console.log($scope.sites);
        });
        Meteor.subscribe("materials", function(){
          $scope.materials = Materials.find().fetch();
          console.log($scope.materials);
        });
        Meteor.subscribe("types", function(){
          $scope.types = Collection_Types.find().fetch();
          console.log($scope.types);
        });
      });

      $scope.addQuantity = function (selectedSite, selectedMaterial, selectedType, quantity) {
        alert(selectedSite);
        alert(quantity);
        $meteor.call('addQuantity', selectedSite, selectedMaterial, selectedType, quantity);
        $scope.quantity='';
      };
    }
  }
});
