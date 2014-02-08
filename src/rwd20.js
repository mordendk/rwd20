(function(angular){ 'use strict';

angular.module('rwd20', [])
	.provider('responsiveService', function() {
		this.breakpoints = {
			small: {
				min: 0,
				max: 600
			},
			medium: {
				min: 600,
				max: 960
			},
			large: {
				min: 960,
				max: 99999
			}
		};

		this.$get = ['$rootScope', function($rootScope) {
			var breakpoints = this.breakpoints,
				getTime = (Date.now || function() {
					return new Date().getTime();
				}),
				debounce = function(func, wait, immediate) {
					var timeout, args, context, timestamp, result;
					return function() {
						context = this;
						args = arguments;
						timestamp = getTime();
						var later = function() {
							var last = getTime() - timestamp;
							if (last < wait) {
								timeout = setTimeout(later, wait - last);
							} else {
								timeout = null;
								if (!immediate) {
									result = func.apply(context, args);
									context = args = null;
								}
							}
						};
						var callNow = immediate && !timeout;
						if (!timeout) {
							timeout = setTimeout(later, wait);
						}
						if (callNow) {
							result = func.apply(context, args);
							context = args = null;
						}

						return result;
					};
				},
				resizeHandler = debounce(function(){
					$rootScope.$apply(function(){
						$rootScope.$broadcast('responsiveWidthChange', document.documentElement.clientWidth);
					});
				}, 500);

			window.onresize = window.onorientationchange = resizeHandler;

			return {
				getBreakpoints: function() {
					return breakpoints;
				},
				isActiveBreakpoint: function(arrayOfBreakpointNames) {

					if(!arrayOfBreakpointNames.length){
						return true;
					}

					var isActive = false,
						clientWidth = document.documentElement.clientWidth;

					for (var i = 0, len = arrayOfBreakpointNames.length; i < len; i++) {
						var name = arrayOfBreakpointNames[i],
							breakpoint = breakpoints[name];

						if(breakpoint && breakpoint.min <= clientWidth && breakpoint.max >= clientWidth){
							isActive = true;
							break;
						}
					}

					return isActive;
				}
			};
		}];

		this.addBreakpoint = function(name, minWidth, maxWidth) {
			this.breakpoints[name] = {
				min: minWidth || 0,
				max: maxWidth || 99999
			};
		};

	})
	.directive('responsiveBreakpoint', ['$animate', 'responsiveService', function( $animate, responsive) {

		var getBlockElements = function(nodes) {
			var startNode = nodes[0],
				endNode = nodes[nodes.length - 1];
			if (startNode === endNode) {
				return angular.element(startNode);
			}

			var element = startNode;
			var elements = [element];

			do {
				element = element.nextSibling;
				if (!element) break;
				elements.push(element);
			} while (element !== endNode);

			return angular.element(elements);
		};

		return {
			transclude: 'element',
			priority: 600,
			terminal: true,
			restrict: 'A',
			$$tlb: true,
			link: function ($scope, $element, $attr, ctrl, $transclude) {
				var block, childScope,
					responsiveBreakpointWatchAction = function() {

						var breakPoints = $scope.$eval($attr.responsiveBreakpoint),
							normalizedBreakPoints = angular.isString(breakPoints) ? breakPoints.split(',') : angular.isArray(breakPoints) ? breakPoints : [];

						if (responsive.isActiveBreakpoint(normalizedBreakPoints)) {
							if (!childScope) {
								childScope = $scope.$new();
								$transclude(childScope, function (clone) {
									clone[clone.length++] = document.createComment(' end responsiveBreakpoint: ' + $attr.responsiveBreakpoint + ' ');
									block = {
										clone: clone
									};
									$animate.enter(clone, $element.parent(), $element);
								});
							}
						} else {
							if (childScope) {
								childScope.$destroy();
								childScope = null;
							}

							if (block) {
								$animate.leave(getBlockElements(block.clone));
								block = null;
							}
						}

						//console.log(breakPoints + ' is ' + responsive.isActiveBreakpoint(normalizedBreakPoints));
					};

				$scope.$watch($attr.responsiveBreakpoint, responsiveBreakpointWatchAction);
				$scope.$on('responsiveWidthChange', responsiveBreakpointWatchAction);

			}
		};

	}]);

})(window.angular);

