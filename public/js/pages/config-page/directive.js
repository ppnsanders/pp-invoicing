'use strict'

angular.module('ppinvoicing').directive('configPage', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$http', 'configServiceModel', '$location', '$window', ($scope, $http, configServiceModel, $location, $window) => {
			$scope.model = configServiceModel
			setTimeout(() => {
				$scope.model.setup()
				$scope.model.query = $location.search()
				if(typeof $scope.model.query.code !== 'undefined') {
						$scope.model.getTokenFromCode()
				} else {
					//nada
				}
			}, 1000)
			
		}],
		templateUrl: '/js/pages/config-page/template.html'
	}
}])