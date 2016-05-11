Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});


function onReady() {
  angular.bootstrap(document, ['simple-todos']);
}

if (Meteor.isCordova)
angular.element(document).on('deviceready', onReady);
else
angular.element(document).ready(onReady);

// This code only runs on the client
angular.module('simple-todos',['angular-meteor', 'ui.router', 'accounts.ui',
  'angularUtils.directives.dirPagination']);
