angular.module('KJVPCE-Bible')
.controller('MainController',
  function($scope, $route, $uibModal, $routeParams, HTTPService, LogService) {
    LogService.logEntry($route.current.controller, 'start', 'Initialize controller');
    var objectName = 'controllers.mod_bible.MainController';
});
