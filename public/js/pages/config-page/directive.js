'use strict'

angular.module('ppinvoicing').directive('configPage', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$http', 'configServiceModel', '$location', ($scope, $http, configServiceModel, $location) => {
			$scope.model = configServiceModel
			$scope.model.setup()
			$scope.model.query = $location.search()
			if(typeof $scope.model.query.code !== 'undefined') {
				setTimeout(() => { 
					$scope.model.getTokenFromCode()
				}, 500)
			} else {
				setTimeout(() => {
					if($scope.model.validateConfig()) {
					} else {
						$scope.model.showConfigModal()
					}
				}, 500)
			}
		}],
		templateUrl: '/js/pages/config-page/template.html'
	}
}])