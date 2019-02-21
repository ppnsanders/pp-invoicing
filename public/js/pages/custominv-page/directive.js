'use strict'

angular.module('ppinvoicing').directive('custominvPage', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$http', 'customInvoiceServiceModel', '$location', ($scope, $http, customInvoiceServiceModel, $location) => {
			$scope.model = customInvoiceServiceModel
			$scope.model.query = $location.search()
			$scope.model.setup()
		}],
		templateUrl: '/js/pages/custominv-page/template.html'
	}
}])