'use strict'

angular.module('ppinvoicing').service('createinvServiceModel', function ($http, $cookies, $location) {

function setup() {
	model.creds = $cookies.getObject('inv-auth')
	model.config = $cookies.getObject('invoicing-config')
	model.access_token = model.creds.creds.access_token
	model.getInvoice()
}

function getInvoice() {
	const reqUrl = "/api/invoice/getObject"
	const config = {
        'xsrfHeaderName': 'X-CSRF-TOKEN',
        'xsrfCookieName': 'XSRF-TOKEN'
    }
	return $http.post(reqUrl, model.config, config).then((response) => {
			model.invoiceObj = response.data
		})
}

function createInvoice() {
	$('#invoiceFields').hide('slide')
    $('#createInvoiceButton').hide()
    $('#invoiceResponseObject').show('slide')
    $('#invoiceLoading').show()
	const reqUrl = '/api/invoice/create'
	const config = {
        'xsrfHeaderName': 'X-CSRF-TOKEN',
        'xsrfCookieName': 'XSRF-TOKEN'
    }
    let reqBody = {}
    	reqBody.access_token = model.access_token
    	reqBody.invoice = model.invoiceObj
    return $http.post(reqUrl, reqBody, config).then((response) => {
    	model.invoiceResponse = response.data.invResponse
    	setTimeout(() => {
    		$('#invoiceLoading').hide('slide')
    		$('#invoiceResponseJson').show()
    		$('#showSendInvoiceButton').show()
    	}, 1000)
    })
}

function showSendInvoice() {
	model.sendObj.send_to_invoicer = false
	model.sendObj.send_to_recipient = false
	model.sendObj.subject = ""
	model.sendObj.note = ""
	model.sendObj.additional_recipients = []
	model.sendObj.additional_recipients[0] = {}
	model.sendObj.additional_recipients[0].email_address = ""
	$('#invoiceFields').hide()
	$('#invoiceRequestObject').hide()
	$('#invoiceResponseObject').hide()
	$('#showSendInvoiceButton').hide()
	$('#sendInvoiceRequest').show('slide')
	$('#sendInvoiceButton').show('slide')
	$('#sendInvoiceRequestFields').show()
	$('#sendInvoiceRequestObj').show()
}

function sendInvoice() {
	$('#sendInvoiceRequest').hide()
	$('#sendInvoiceButton').hide()
	$('#invoiceRequestObject').hide()
	$('#sendInvoiceResponse').show('slide')
	$('#sendInvoiceResponseLoading').show('slide')
	const reqUrl = '/api/invoice/send'
	const config = {
        'xsrfHeaderName': 'X-CSRF-TOKEN',
        'xsrfCookieName': 'XSRF-TOKEN'
    }
    let reqBody = {}
    	reqBody.access_token = model.access_token
    	reqBody.url = model.invoiceResponse.body.href + "/send"
    	reqBody.body = model.sendObj
    return $http.post(reqUrl, reqBody, config).then((response) => {
    	setTimeout(() => {
    		$('#sendInvoiceResponseLoading').hide()
    		$('#sendInvoiceResponseJson').show()
    		$('#showCustomInvoiceButton').show()
    	}, 1500)
    	if(response.error) {
    		console.log("ERROR: ", response)
    		model.sendResponse = response
    	} else {
    		model.sendResponse = response.data.sendResponse
    		model.invoiceId = model.sendResponse.body.href.split('#')[1]

    	}
    })
}

function showCustomInvoicePage() {
	const customInvoiceUrl = '/custominv?inv=' + model.invoiceId
	$location.url(customInvoiceUrl)
}

let model = {
	config: {},
	creds: {},
	access_token: "",
	invoiceObj: {},
	invoiceResponse: {},
	sendObj: {},
	sendResponse: {},
	invoiceId: "",
	setup: (model) => {
		return setup(model)
	},
	getInvoice: (model) => {
		return getInvoice(model)
	},
	createInvoice: (model) => {
		return createInvoice(model)
	},
	showSendInvoice: (model) => {
		return showSendInvoice(model)
	},
	sendInvoice: (model) => {
		return sendInvoice(model)
	},
	showCustomInvoicePage: (model) => {
		return showCustomInvoicePage(model)
	}
}
 
return model
 
})