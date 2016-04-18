angular.module('KJVPCE-Bible')
.directive("buttonrange", function() {
  return {
    scope: {
      openCtrlFn: '&callbackFn',
      heading: '@heading',
      headingclass: '@headingclass',
      data: '=data',
      match: '=match',
      key: '@key'
    },
    restrtict: 'E',
    templateUrl : "../static/mod_bible/views/directives/buttonrange.html",
    link: function postLink(scope, element, attrs) {
      // element.text('this is the apptoolbar directive');
      scope.openCtrlFunction = function(arg1) {
        scope.openCtrlFn({arg1: arg1});
      }
    }
  };
});
