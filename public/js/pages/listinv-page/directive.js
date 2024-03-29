'use strict'

angular.module('ppinvoicing').directive('listinvPage', [ () => {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', '$http', 'listInvoiceServiceModel', '$location', ($scope, $http, listInvoiceServiceModel, $location) => {
			$scope.model = listInvoiceServiceModel
			$scope.model.setup()
			$scope.checkOverDue = (inv) => {
				if(inv.status !== 'PAID' || inv.status !== 'CANCELLED' || inv.status !== 'DRAFT') {
					if(typeof inv.detail.payment_term !== 'undefined') {
						if(typeof inv.detail.payment_term.due_date !== 'undefined') {
							let dueDate = new Date(inv.detail.payment_term.due_date)
							let nowDate = Date.now()
							if(dueDate < nowDate) {
								return true
							} else {
								return false
							}
						} else {
							return false
						}
					} else {
						return false
					}
				} else {
					return false
				}
			}
			$scope.makePayment = (id) => {
				$location.search('invoiceId', id)
				$('#paymentModal').modal('show')
			}
		}],
		templateUrl: '/js/pages/listinv-page/template.html'
	}
}])