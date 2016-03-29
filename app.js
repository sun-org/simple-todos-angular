Tasks = new Mongo.Collection('tasks');
Sites = new Mongo.Collection('sites');


if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  // This code only runs on the client
  angular.module('simple-todos',['angular-meteor', 'ui.router', 'accounts.ui']);

  function onReady() {
    angular.bootstrap(document, ['simple-todos']);
  }

  if (Meteor.isCordova)
  angular.element(document).on('deviceready', onReady);
  else
  angular.element(document).ready(onReady);







  // Router CONFIG
  angular.module('simple-todos').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
    .state('home', {
      url: '/home',
      template: '<home></home>'
    })
    .state('tasks', {
      url: '/tasks',
      template: '<todo-list></todo-list>'
    })
    .state('search', {
      url: '/search',
      template: '<search-task></search-task>'
    })
    .state('withdraw', {
      url: '/withdraw',
      template: '<withdraw-task></withdraw-task>'
    })
    .state('add', {
      url: '/add',
      template: '<add-task></add-task>'
    });

    $urlRouterProvider.otherwise("/");
  });








// Home directive
  angular.module('simple-todos').directive('home', function () {
    return {
      restrict: 'E',
      templateUrl: 'home.html',
      controllerAs: 'homeCtrl',
      controller: function ($scope, $reactive,$meteor) {

        $scope.resetDatabase = function(){
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








// add task directive
  angular.module('simple-todos').directive('addTask', function () {
    return {
      restrict: 'E',
      templateUrl: 'addTask.html',
      controllerAs: 'addTaskCtrl',
      controller: function ($scope, $reactive, $meteor) {
//        $scope.sites = ["site1", "site2"];
        $scope.materials = ["cement", "steel"];
        $scope.types = ["L shape", "cylinder", "rod"];
        $scope.quantity = 10;

        $scope.sites = Sites.find();

        $scope.addQuantity = function (selectedSite,quantity) {
          alert(selectedSite);
          alert(quantity);
          $meteor.call('addQuantity',quantity);
          $scope.newTask=''; $scope.quantity='';
        };
      }
    }
  });

// withdraw directive
  angular.module('simple-todos').directive('withdrawTask', function () {
    return {
      restrict: 'E',
      templateUrl: 'withdrawTask.html',
      controllerAs: 'withdrawTaskCtrl',
      controller: function ($scope, $reactive) {
        $scope.sites = ["site1", "site2"];
      }
    }
  });

// search directive
  angular.module('simple-todos').directive('searchTask', function () {
    return {
      restrict: 'E',
      templateUrl: 'searchTask.html',
      controllerAs: 'searchTaskCtrl',
      controller: function ($scope, $reactive) {
        $scope.sites = ["site1", "site2"];
      }
    }
  });
}


if(Meteor.isServer){

  //METEOR methods
    Meteor.methods({
      addQuantity: function (quantity) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
        }

        alert(quantity);
      },
      addTask: function (text, quantity) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
        }

        Tasks.insert({
          text: text,
          quantity: quantity,
          createdAt: new Date(),
          owner: Meteor.userId(),
          username: Meteor.user().username
        });
      },
      deleteTask: function (taskId) {
        var task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
          // If the task is private, make sure only the owner can delete it
          throw new Meteor.Error('not-authorized');
        }

        Tasks.remove(taskId);
      },
      setChecked: function (taskId, setChecked) {
        var task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
          // If the task is private, make sure only the owner can check it off
          throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { checked: setChecked} });
      },
      setPrivate: function (taskId, setToPrivate) {
        var task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { private: setToPrivate } });
      },


      resetDatabase: function () {
        if (! Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
        }

       Sites.remove({});
       Sites.insert({name: "site1", description:"desc1", createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username});
       Sites.insert({name: "site2", description:"desc2", createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username});
       Sites.insert({name: "site3", description:"desc3", createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username});
       Sites.insert({name: "site4", description:"desc4", createdAt: new Date(), owner: Meteor.userId(), username: Meteor.user().username});
      },


      updateQuantity: function (taskId, newQuantity) {
        var task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
        }

        Tasks.update(taskId, { $set: { quantity: newQuantity } });
      }
    });

}
