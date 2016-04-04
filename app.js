if (Meteor.isClient) {
  // todo-LIST directive
  angular.module('simple-todos').directive('todoList', function () {
    return {
      restrict: 'E',
      templateUrl: 'todos.html',
      controllerAs: 'todoListCtrl',
      controller: function ($scope, $reactive, $meteor) {

        $scope.$meteorSubscribe('tasks');

        $scope.tasks = $meteor.collection(function() {
          return Tasks.find($scope.getReactively('query'), {sort: {createdAt: -1}})
        });

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
