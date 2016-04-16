angular.module('mlt.directives')
.directive('pressableElement', function ($timeout) {
	return {
		restrict: 'C', // only matches class name
		link: function ($scope, $elm, $attrs) {
			if (angular.isFake) {
				// onLongPress: on-long-press
				$elm.bind('contextmenu', function (evt) {
					if ($attrs.onLongPress) {
						$scope.$apply(function () {
							$scope.$eval($attrs.onLongPress, { $event: evt });
						});
					}
					return false;
				});

				// onTouch: on-touch
				$elm.bind('mousedown', function (evt) {
					if ($attrs.onTouch) {
						$scope.$apply(function () {
							$scope.$eval($attrs.onTouch, { $event: evt });
						});
					}
				});

				// onTouchEnd: on-touch-end
				$elm.bind('mouseup', function (evt) {
					if ($attrs.onTouchEnd) {
						$scope.$apply(function () {
							$scope.$eval($attrs.onTouchEnd, { $event: evt });
						});
					}
				});

				// onClick: on-click
				$elm.bind('click', function (evt) {
					if ($attrs.onClick) {
						$scope.$apply(function () {
							$scope.$eval($attrs.onClick, { $event: evt });
						});
					}
				});
			} else {
				$elm.bind('mousedown', function (evt) {
					$scope.longPress = true;
					$scope.click = true;
					$scope._pressed = null;

					// onLongPress: on-long-press
					$scope._pressed = $timeout(function () {
						$scope.click = false;
						if ($scope.longPress && $attrs.onLongPress) {
							$scope.$apply(function () {
								$scope.$eval($attrs.onLongPress, { $event: evt });
							});
						}
					}, $attrs.timeOut || 1000); // timeOut: time-out

					// onTouch: on-touch
					if ($attrs.onTouch) {
						$scope.$apply(function () {
							$scope.$eval($attrs.onTouch, { $event: evt });
						});
					}
				});

				$elm.bind('mouseup', function (evt) {
					$scope.longPress = false;
					$timeout.cancel($scope._pressed);

					// onTouchEnd: on-touch-end
					if ($attrs.onTouchEnd) {
						$scope.$apply(function () {
							$scope.$eval($attrs.onTouchEnd, { $event: evt });
						});
					}

					// onClick: on-click
					if ($scope.click && $attrs.onClick) {
						$scope.$apply(function () {
							$scope.$eval($attrs.onClick, { $event: evt });
						});
					}
				});
			}
		}
	};
})
