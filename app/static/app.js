angular
  .module('KJVPCE', ['ngRoute', 'http-service', 'log-service'])
  .config(['$routeProvider', function($routeProvider, HTTPService, LogService) {
    $routeProvider
      .when('/', {
          templateUrl: '../static/main.html',
          controller: 'MainController'
      })
      .otherwise({ redirectTo: '/' });
  }])
  .controller('MainController', [
    '$scope',
    '$http',
    function($scope) {
    }
]);
