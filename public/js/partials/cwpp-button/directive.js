'use strict'

angular.module('ppinvoicing').directive('cwppButton', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$http', 'cwppServiceModel', ($scope, $http, cwppServiceModel) => {
			$scope.model = cwppServiceModel
			$scope.model.setup()
		}],
		templateUrl: '/js/partials/cwpp-button/template.html'
	}
}])