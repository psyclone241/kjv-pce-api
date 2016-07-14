angular.module('KJVPCE-Bible')
.controller('MainController',
  function($scope, $route, $uibModal, $routeParams, HTTPService, LogService) {
    var object_name = $route.current.controller;
    LogService.logEntry(object_name, 'start', 'Initialize controller');

    $scope.config.screen_name = object_name;
    $scope.config.body.navbar_collapsed = true;
    $scope.config.body.expand_disabled = false;
    $scope.config.body.style = {
      // "padding-top": "100px"
      "padding-top": "50px"
    };
    $scope.config.navbar.style = {
      "background-color": "#CECECE",
      "height": "55px"
    };

    $scope.itemOnLongPress = function (id) {
      $scope.result = 'itemOnLongPress: ' + id;
    };

    $scope.itemOnTouch = function (id) {
      $scope.result = 'itemOnTouch: ' + id;
    };

    $scope.itemOnTouchEnd = function (id) {
      $scope.result = 'itemOnTouchEnd: ' + id;
    };

    $scope.itemOnClick = function (id) {
      $scope.result = 'itemOnClick: ' + id;
    };
});
