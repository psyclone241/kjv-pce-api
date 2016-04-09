angular.module('KJVPCE-Bible')
.controller('MainController',
  function($scope, $route, $uibModal, $routeParams, HTTPService, LogService) {
    var object_name = $route.current.controller;
    LogService.logEntry(object_name, 'start', 'Initialize controller');
});
