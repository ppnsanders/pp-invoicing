'use strict'

angular.module('ppinvoicing').service('listInvoiceServiceModel', function ($http, $cookies) {

//using list invoices: https://developer.paypal.com/docs/limited-release/invoicing/api/#invoices_list

function setup() {
	$('.ui.accordion').accordion()
	model.config = $cookies.getObject('invoicing-config')
	if(typeof model.config !== 'undefined') {
			model.listInvoices()
	} else {
		//no creds, pop settings
		$('#configModal').modal('show')
	}
}

function listInvoices() {
	const reqUrl = '/api/invoice/listInvoices'
	const config = {
        'xsrfHeaderName': 'X-CSRF-TOKEN',
        'xsrfCookieName': 'XSRF-TOKEN'
    }
    let reqBody = {}
    	reqBody.access_token = model.config.access_token
    	reqBody.queryString = "?total_required=" + model.queryParams.total_required + "&page_size=" + model.queryParams.page_size + "&page=" + model.queryParams.page + "&fields=" + model.queryParams.fields
    return $http.post(reqUrl, reqBody, config).then((response) => {
    	if(response.error) {
    		console.log("ERROR: ", response)
    		model.errorResponse = response
    	} else {
    		model.invoices = response.data.invoices.items
    	}
	})
}

function setPayStatus(status) {
	if(typeof status === 'undefined') {
		 return false
	} else {
		if(status === 'SENT' || status === 'UNPAID' || status === 'PARTIALLY_PAID' || status === 'PAYMENT_PENDING') {
           return true 
        } else {
           return false
        }
	}
}

function setOrderBy(order) {
	model.orderBy = order
}

let model = {
		config: {},
		queryParams: {
			page: 1,
			page_size: 100,
			total_required: false,
			fields: ""
		},
		invoices: [],
		errorResponse: {},
		orderBy: '-detail.metadata.create_time',
		setup: (model) => {
			return setup(model)
		},
		listInvoices: (model) => {
			return listInvoices(model)
		},
		setOrderBy: (model) => {
			return setOrderBy(model)
		},
		setPayStatus: (model) => {
			return setPayStatus(model)
		}
}
 
return model
 
})
