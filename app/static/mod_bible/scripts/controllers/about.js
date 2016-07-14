angular.module('KJVPCE-Bible')
.controller('AboutController',
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

    var data_url = $scope.config.restUrl;

    $scope.getVersionInformation = function() {
      var return_value = HTTPService.get(data_url + 'version').then(function (data) {
        $scope.data.version_information = data.results;
        return true;
      });
      return return_value;
    };

    $scope.software_version = 'Unknown';
    $scope.getVersionInformation();
    $scope.$watch('data.version_information', function() {
      if($scope.data.version_information) {
        $scope.software_version = $scope.data.version_information.version;
      }
    });
});
