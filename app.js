if (Meteor.isClient) {
  // todo-LIST directive
  angular.module('simple-todos').directive('todoList', function () {
    return {
      restrict: 'E',
      templateUrl: 'todos.html',
      controllerAs: 'todoListCtrl',
      controller: function ($scope, $reactive, $meteor) {

        $scope.perPage = 2;
        $scope.page = 1;
        $scope.sort = {
          name: 1
        };
        $scope.orderProperty = '1';
        $scope.tasksCount = 0;

        // $scope.$meteorSubscribe('tasks');
        $scope.$meteorSubscribe('tasks', {
          limit: parseInt($scope.perPage),
          skip: parseInt(($scope.page - 1) * $scope.perPage),
          sort: $scope.sort
        });


        $scope.tasks = $meteor.collection(function() {
          return Tasks.find($scope.getReactively('query'), { sort : $scope.getReactively('sort') })
        });


        $scope.tasks = $meteor.collection(function() {
          return Tasks.find($scope.getReactively('query'), { sort : $scope.getReactively('sort') })
        });


        $scope.partiesCount = function () {
          $scope.partiesCount = Counts.get('numberOfParties');
          alert("count "+$scope.partiesCount);
        };
        $scope.updateSort = function () {
          $scope.sort = parseInt($scope.orderProperty);
        };

        $scope.addTask = function (newTask, quantity) {
          alert(quantity);
          $meteor.call('addTask', newTask, quantity);
          $scope.newTask=''; $scope.quantity='';
        };

        $scope.saveQuantity = function(task, quantity){
          alert("" + task.quantity + "    " + quantity);
          $meteor.call('updateQuantity', task._id, quantity);
        };

        $scope.deleteTask = function (task) {
          $meteor.call('deleteTask', task._id);
        };

        $scope.pageChanged = function (newPage) {
          alert("count "+newPage);
          $scope.page = newPage;
        };

        $scope.setChecked = function (task) {
          $meteor.call('setChecked', task._id, !task.checked);
        };

        $scope.setPrivate = function (task) {
          $meteor.call('setPrivate', task._id, ! task.private);
        };

        $scope.$watch('hideCompleted', function() {
          if ($scope.hideCompleted)
          $scope.query = {checked: {$ne: true}};
          else
          $scope.query = {};
        });

        $scope.incompleteCount = function () {
          return Tasks.find({ checked: {$ne: true} }).count();
        };

      }
    }
  });

}
