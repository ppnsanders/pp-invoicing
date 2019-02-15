'use strict'

angular.module('ppinvoicing').directive('headerNav', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', ($scope) => {
			$scope.nav = [ 
							{
								url: "/home",
								text: "Home"
							},
							{
								url: "/page2",
								text: "Page 2"
							}
						]
		}],
		templateUrl: '/js/partials/header-nav/template.html'
	}
}])