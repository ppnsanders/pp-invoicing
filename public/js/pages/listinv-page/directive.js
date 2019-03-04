'use strict'

angular.module('ppinvoicing').directive('listinvPage', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$http', 'listInvoiceServiceModel', ($scope, $http, listInvoiceServiceModel) => {
			$scope.model = listInvoiceServiceModel
		}],
		templateUrl: '/js/pages/listinv-page/template.html'
	}
}])