// angular.module('mlt.directives')
// .directive('focusMeOne', function($timeout, $parse) {
//   return {
//     //scope: true,   // optionally create a child scope
//     link: function(scope, element, attrs) {
//       var model = $parse(attrs.focusMeOne);
//       scope.$watch(model, function(value) {
//         console.log('value=',value);
//         if(value === true) {
//           $timeout(function() {
//             element[0].focus();
//           });
//         }
//       });
//       element.bind('blur', function() {
//          console.log('blur');
//          scope.$apply(model.assign(scope, false));
//       });
//     }
//   };
// });

angular.module('mlt.directives')
.directive('focusMe', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focusMe, function(value) {
        if(value === true) {
          console.log('value=',value);
          //$timeout(function() {
            element[0].focus();
            scope[attrs.focusMe] = false;
          //});
        }
      });
    }
  };
});
