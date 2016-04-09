angular
  .module('KJVPCE-Bible', ['ngRoute', 'ui.bootstrap', 'http-service', 'log-service'])
  .config(function($routeProvider, $provide) {
    $provide.factory('$routeProvider', function() {
      return $routeProvider;
    });
  })
  .run(function($rootScope, $route, $routeProvider, HTTPService, LogService) {
    var object_name = 'config';
    $rootScope.mode = null;
    $rootScope.config = {};
    $rootScope.routes = {};
    $rootScope.routes.enabled = false;
    $rootScope.defaults = {};

    HTTPService.get('../static/mod_bible/config/config.json').then(function(data) {
      var mode = data.mode.current;
      $rootScope.mode = mode;
      $rootScope.config = data[mode];
      $rootScope.defaults = data.defaults;
    });

    $routeProvider
      .when('/', {
        templateUrl: '../static/mod_bible/views/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        reloadOnSearch: false,
      })
      .when('/lookup', {
        templateUrl: '../static/mod_bible/views/lookup.html',
        controller: 'LookupController',
        controllerAs: 'lookup',
        reloadOnSearch: false,
      })
      .otherwise({ redirectTo: '/' });
  });
