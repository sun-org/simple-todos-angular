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
