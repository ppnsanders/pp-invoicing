'use strict'

angular.module('ppinvoicing').service('customInvoiceServiceModel', function ($http, $cookies) {


function setup() {
	$('.ui.accordion').accordion()
	model.config = $cookies.getObject('invoicing-config')
	model.invoiceId = model.query.inv
	if(model.query.inv) {
		model.getInvoiceDetails()
	} else {

	}
}

function getInvoiceDetails() {
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
    	} else {
    		model.invoice = response.data.invoice
    		model.setStatus()
    		model.setTransactions()
    		model.getDiscountTotal()
    	}
    })
}

function setStatus() {
	if(model.invoice.status === "PAID") {
		model.unpaid = false
	} else {
		model.unpaid = true
	}
}

function setTransactions() {
	if(typeof model.invoice.payments !== 'undefined') {
		model.transactions = true
	} else {
		model.transactions = false
	}
}

function getInvoiceDiscount(callback) {
	let invoiceDiscount = 0.00
	if(typeof model.invoice.amount.breakdown.discount !== 'undefined') {
		if(typeof model.invoice.amount.breakdown.discount.invoice_discount !== 'undefined') {
			if(typeof model.invoice.amount.breakdown.discount.invoice_discount.amount !== 'undefined') {
				if(typeof model.invoice.amount.breakdown.discount.invoice_discount.amount.value !== 'undefined') {
					invoiceDiscount = parseFloat(model.invoice.amount.breakdown.discount.invoice_discount.amount.value)
					callback(null, invoiceDiscount)
				} else {
					callback('no amount.breakdown.discount.invoice_discount.amount.value', invoiceDiscount)
				}
			} else {
				callback('no amount.breakdown.discount.invoice_discount.amount', invoiceDiscount)
			}
		} else {
			callback('no amount.breakdown.discount.invoice_discount', invoiceDiscount)
		}
	} else {
		callback('no model.invoice.amount.breakdown.discount', invoiceDiscount)
	}
}

function getItemDiscount(callback) {
	let itemDiscount = 0.00
	if(typeof model.invoice.amount.breakdown.discount !== 'undefined') {
		if(typeof model.invoice.amount.breakdown.discount.item_discount !== 'undefined') {
			if(typeof model.invoice.amount.breakdown.discount.item_discount.value !== 'undefined') {
				itemDiscount = parseFloat(model.invoice.amount.breakdown.discount.item_discount.value)
				callback(null, itemDiscount)
			} else {
				callback('no amount.breakdown.discount.item_discount.value', itemDiscount)
			}
		} else {
			callback('no amount.breakdown.discount.item_discount', itemDiscount)
		}
	} else {
		callback('no model.invoice.amount.breakdown.discount', itemDiscount)
	}
}

function addToDiscount(discount) {
	model.discountTotal = model.discountTotal + discount
}

function getDiscountTotal() {
	getInvoiceDiscount((err, invDiscount) => {
		if(err) { console.log(err) }
		addToDiscount(invDiscount)
	})
	getItemDiscount((err, itemDiscount) => {
		if(err) { console.log(err) }
		addToDiscount(itemDiscount)
	})
}

let model = {
		query: {},
		creds: {},
		config: {},
		access_token: "",
		invoiceId: "",
		invoice: {},
		discountTotal: 0,
		unpaid: true,
		transactions: false,
		setup: (model) => {
			return setup(model)
		},
		getInvoiceDetails: (model) => {
			return getInvoiceDetails(model)
		},
		setStatus: (model) => {
			return setStatus(model)
		},
		setTransactions: (model) => {
			return setTransactions(model)
		},
		getDiscountTotal: (model) => {
			return getDiscountTotal(model)
		}
}
 
return model
 
})