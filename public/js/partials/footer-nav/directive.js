'use strict'

angular.module('ppinvoicing').directive('footerNav', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', ($scope) => {
		}],
		templateUrl: '/js/partials/footer-nav/template.html'
	}
}])