'use strict'

angular.module('ppinvoicing').directive('segmentLoader', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', ($scope) => {

		}],
		templateUrl: '/js/partials/segment-loader/template.html'
	}
}])