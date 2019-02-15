'use strict'

angular.module('ppinvoicing').directive('configPage', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$http', 'configServiceModel', ($scope, $http, configServiceModel) => {
			$scope.model = configServiceModel
			$scope.model.setup()
		}],
		templateUrl: '/js/pages/config-page/template.html'
	}
}])