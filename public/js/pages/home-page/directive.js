'use strict'

angular.module('ppinvoicing').directive('homePage', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$http', 'homeServiceModel', ($scope, $http, homeServiceModel) => {
			$scope.model = homeServiceModel
			
		}],
		templateUrl: '/js/pages/home-page/template.html'
	}
}])