angular
  .module('KJVPCE-Bible', ['ngRoute', 'ui.bootstrap', 'mlt.services', 'mlt.directives', 'ui.contextmenu'])
  .config(function($routeProvider, $provide) {
    $provide.factory('$routeProvider', function() {
      return $routeProvider;
    });
  })
  .run(function($rootScope, $route, $routeProvider, HTTPService, LogService, $location) {
    var object_name = 'config';
    $rootScope.mode = null;
    $rootScope.config = {};
    $rootScope.routes = {};
    $rootScope.routes.enabled = false;
    $rootScope.defaults = {};

    $rootScope.home = function() {
      $location.path('/');
    };

    HTTPService.get('../static/mod_bible/config/config.json').then(function(data) {
      var mode = data.mode.current;
      $rootScope.mode = mode;
      $rootScope.config = data[mode];
      $rootScope.defaults = data.defaults;

      $rootScope.config.body = data.defaults.body;
      $rootScope.config.navbar = data.defaults.navbar;
    });

    $routeProvider
      .when('/', {
        templateUrl: '../static/mod_bible/views/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        reloadOnSearch: false,
      })
      .when('/lookup/:ref_id?', {
        templateUrl: '../static/mod_bible/views/lookup.html',
        controller: 'LookupController',
        controllerAs: 'lookup',
        reloadOnSearch: false,
      })
      .otherwise({ redirectTo: '/' });
  });
