'use strict'

angular.module('ppinvoicing').directive('createinvPage', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$http', 'createinvServiceModel', ($scope, $http, createinvServiceModel) => {
			$scope.model = createinvServiceModel
			$scope.model.setup()
		}],
		templateUrl: '/js/pages/createinv-page/template.html'
	}
}])