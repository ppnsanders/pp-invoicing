'use strict'

angular.module('ppinvoicing').directive('paymentModal', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$http', 'paymentModalServiceModel', '$location', ($scope, $http, paymentModalServiceModel, $location) => {
			$scope.model = paymentModalServiceModel
			$scope.model.setup()
		}],
		templateUrl: '/js/partials/payment-modal/template.html'
	}
}])





