'use strict'

angular.module('ppinvoicing').directive('headerNav', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$location', ($scope, $location) => {
			if($location.path() === '/config'){
				$scope.showSettings = false
				$('#configModal').modal('show')
			} else {
				$scope.showSettings = true
			}
			$scope.nav = [ 
							{
								url: "/createinv",
								text: "Create Invoice"
							},
							{
								url: "/listinv",
								text: "List Invoices"
							}
						]
			$scope.showConfigModal = () => {
				$('#configModal').modal('show')
			}
		}],
		templateUrl: '/js/partials/header-nav/template.html'
	}
}])