angular.module('KJVPCE', ['ngRoute', 'ui.bootstrap', 'http-service', 'log-service'])
.config(function($routeProvider, $provide) {
  $provide.factory('$routeProvider', function() {
    return $routeProvider;
  });
})
.run(function($rootScope, $route, $routeProvider, HTTPService, LogService) {
  $routeProvider
    .when('/', {
      templateUrl: '../static/root/views/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      reloadOnSearch: false,
    })
    .otherwise({ redirectTo: '/' });
});
