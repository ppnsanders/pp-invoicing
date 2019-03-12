'use strict'

angular.module('ppinvoicing').service('paymentModalServiceModel', function ($http, $cookies, $location) {

function setup() {
	$('.ui.dropdown').dropdown()
	model.config = $cookies.getObject('invoicing-config')
	model.methodSetup()
	model.createPayment = {}
    model.createPayment.amount = {}
    model.createPayment.amount.currency_code = "USD"
	const query = $location.search()
		  model.invoiceId = query.invoiceId
	if(typeof query.invoiceId === 'undefined') {
		//do nothing.. initial list load..
	} else{
		
	}
}


function makePayment() {
	let dt = new Date()
	model.createPayment.payment_date = "" + dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + (dt.getDate())).slice(-2) + ""
	model.validatePayment((err, result) => {
		if(err) {
			console.log(err)
			return false
		} else {
			console.log(result)
			if(result) {
				const reqUrl = '/api/payment/create'
				const config = {
			        'xsrfHeaderName': 'X-CSRF-TOKEN',
			        'xsrfCookieName': 'XSRF-TOKEN'
			    }
			    const reqBody = {
			    		access_token: model.config.access_token,
			    		invoiceId: model.invoiceId,
			    		payment: model.createPayment
			    }
			    return $http.post(reqUrl, reqBody, config).then((response) => {
					if(response.data.error) {
			    		console.log("ERROR: ", response)
			    		model.invoice = response
			    	} else {
			    		console.log(response)
			    		//payment success..
			    		//close modal, refresh invoice list.
			    		$('#paymentModal').modal('hide')
			    		$location.path('/listinv')
			    	}
			    })
			} else {
				$('#paymentErrorMsg').show()
				return false
			}
		}
	})
		

}

function validatePayment(cb) {
	model.getInvoiceDetails((err, result) => {
		let invAmount = 0
		let pmtAmount = parseFloat(model.createPayment.amount.value)
		if(err) {
			cb(err)
			console.log('got err getting invoice details', err)
		} else {
			if(typeof model.invoice.due_amount !== 'undefined') {
				if(typeof model.invoice.due_amount.value !== 'undefined') {
					invAmount = parseFloat(model.invoice.due_amount.value)
					if(invAmount >= pmtAmount) {
						if(model.invoice.amount.currency_code === model.createPayment.amount.currency_code) {
							cb(null, true)
						} else {
							//currency code invalid
							model.errMsg.message.push("Your Currency must be the same as the invoice. " + model.invoice.amount.currency_code)
							cb(null, false)
						}
					} else {
						//amount entered is more than invoice amount.
						model.errMsg.message.push("The Amount MUST be less than or equal to the Invoice Due Amount of " + model.invoice.due_amount.value)
						cb(null, false)
					}
				} else {
					//no due amount value.. in the due_amount obj
					//no error to show.. but there is an error.. 
					console.log('no due_amount.value in the due_amount object')
					cb(null, false)
				}
			} else {
				console.log('no due_amount, using invoice amount')
					invAmount = parseFloat(model.invoice.amount.value)
					if(invAmount >= pmtAmount) {
						if(model.invoice.amount.currency_code === model.createPayment.amount.currency_code) {
							cb(null, true)
						} else {
							//currency code invalid
							model.errMsg.message.push("Your Currency must be the same as the invoice. " + model.invoice.amount.currency_code)
							$('#errorMsg').show()
							cb(null, false)
						}
					} else {
						//amount entered is more than invoice amount.
						model.errMsg.message.push("The Amount MUST be less than or equal to the Invoice Amount of " + model.invoice.due_amount.value)
							$('#errorMsg').show()
							cb(null, false)
					}
			}
		}

	})

}

function getInvoiceDetails(cb) {
	const reqUrl = '/api/invoice/byId/'
	const config = {
        'xsrfHeaderName': 'X-CSRF-TOKEN',
        'xsrfCookieName': 'XSRF-TOKEN'
    }
    const reqBody = {
    		access_token: model.config.access_token,
    		invoiceId: model.invoiceId
    }
    return $http.post(reqUrl, reqBody, config).then((response) => {
		if(response.error) {
    		console.log("ERROR: ", response)
    		model.invoice = response
    		cb(true, false)
    	} else {
    		model.invoice = response.data.invoice
    		cb(false, true)
    	}
    })
}


function methodSetup() {
	model.methods[0] = {}
	model.methods[0].name = "Bank Transfer"
	model.methods[0].value = "BANK_TRANSFER"
	model.methods[1] = {}
	model.methods[1].name = "Cash"
	model.methods[1].value = "CASH"
	model.methods[2] = {}
	model.methods[2].name = "Check"
	model.methods[2].value = "CHECK"
	model.methods[3] = {}
	model.methods[3].name = "Credit Card"
	model.methods[3].value = "CREDIT_CARD"
	model.methods[4] = {}
	model.methods[4].name = "Debit Card"
	model.methods[4].value = "DEBIT_CARD"
	model.methods[5] = {}
	model.methods[5].name = "PayPal"
	model.methods[5].value = "PAYPAL"
	model.methods[6] = {}
	model.methods[6].name = "Wire Transfer"
	model.methods[6].value = "WIRE_TRANSFER"
	model.methods[7] = {}
	model.methods[7].name = "Other"
	model.methods[7].value = "OTHER"
}

let model = {
	config: {},
	methods: [],
	invoiceId: "",
	invoice: {},
	payment: {},
	createPayment: {},
	errMsg: { message: [] },
	setup: (model) => {
		return setup(model)
	},
	methodSetup: (model) => {
		return methodSetup(model)
	},
	makePayment: (model) => {
		return makePayment(model)
	},
	getInvoiceDetails: (model) => {
		return getInvoiceDetails(model)
	},
	validatePayment: (model) => {
		return validatePayment(model)
	}
}
 
return model
 
})