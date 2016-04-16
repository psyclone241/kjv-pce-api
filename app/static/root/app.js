angular.module('KJVPCE', ['ngRoute', 'ui.bootstrap', 'mlt.services', 'mlt.directives', 'ui.contextmenu'])
.config(function($routeProvider, $provide, $interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
  $provide.factory('$routeProvider', function() {
    return $routeProvider;
  });
})
.run(function($rootScope, $route, $routeProvider, HTTPService, LogService, $location, $anchorScroll) {
  $routeProvider
    .when('/', {
      templateUrl: '../static/root/views/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      reloadOnSearch: false,
    })
    .otherwise({ redirectTo: '/' });
});
