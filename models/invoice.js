'use strict'

const sandbox = Environment()
const faker = require('faker')

module.exports = function InvoiceModel(invData, invNum) {
	const dt = new Date()
	const invDate = "" + dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + (dt.getDate())).slice(-2) + ""

	const ddt = new Date()
		  ddt.setDate(ddt.getDate() + 10)
	const dueDate = "" + ddt.getFullYear() + "-" + ("0" + (ddt.getMonth() + 1)).slice(-2) + "-" + ("0" + (ddt.getDate())).slice(-2) + ""

	let merEmail = ""
	if(typeof invData.merchant !== 'undefined') {
		if(typeof invData.merchant.email !== 'undefined'){
			merEmail = invData.merchant.email 
		} else {
			merEmail = "invSender@paypal.com"
		}
	} else {
		merEmail = "invSender@paypal.com"
	}

	let conEmail = ""
	if(typeof invData.consumer !== 'undefined') {
		if(typeof invData.consumer.email !== 'undefined') {
			conEmail = invData.consumer.email
		} else {
			conEmail = "invReceiver@paypal.com"
		}
	} else {
		conEmail = "invReceiver@paypal.com"
	}

	let inv = {}
		inv.detail = {}
		inv.detail.invoice_number = invNum
		inv.detail.reference = "REF-" + inv.detail.invoice_number
		inv.detail.invoice_date = invDate
		inv.detail.currency_code = "USD"
		inv.detail.note = faker.random.words()
		inv.detail.terms_and_conditions = faker.random.words()
		inv.detail.memo = faker.random.words()
		inv.detail.payment_term = {}
		inv.detail.payment_term.term_type = "NET_10"
		inv.detail.payment_term.due_date = dueDate

		//Invoicer
		inv.invoicer = {}
		inv.invoicer.name = {}
		inv.invoicer.name.given_name = faker.name.firstName()
		inv.invoicer.name.surname = faker.name.lastName()
		inv.invoicer.address = {}
		inv.invoicer.address.address_line_1 = faker.address.streetAddress()
		inv.invoicer.address.address_line_2 = faker.address.secondaryAddress()
		inv.invoicer.address.admin_area_2 = faker.address.city()
		inv.invoicer.address.admin_area_1 = "NE"
		inv.invoicer.address.postal_code = "68046"
		inv.invoicer.address.country_code = "US"
		inv.invoicer.email_address = merEmail
		inv.invoicer.phones = []
		inv.invoicer.phones[0] = {}
		inv.invoicer.phones[0].country_code = "001"
		inv.invoicer.phones[0].national_number = "8882211161"
		inv.invoicer.phones[0].phone_type = "MOBILE"
		inv.invoicer.website = "https://www.paypal.com"
		inv.invoicer.tax_id = faker.random.uuid()
		inv.invoicer.logo_url = "https://avatars1.githubusercontent.com/u/476675?s=200&v=4"
		inv.invoicer.additional_notes = faker.random.words()

		//Primary Recipients
		inv.primary_recipients = []
		inv.primary_recipients[0] = {}
		inv.primary_recipients[0].billing_info = {}
		inv.primary_recipients[0].billing_info.name = {}
		inv.primary_recipients[0].billing_info.name.given_name = faker.name.firstName()
		inv.primary_recipients[0].billing_info.name.surname = faker.name.lastName()
		inv.primary_recipients[0].billing_info.address = {}
		inv.primary_recipients[0].billing_info.address.address_line_1 = faker.address.streetAddress()
		inv.primary_recipients[0].billing_info.address.address_line_2 = faker.address.secondaryAddress()
		inv.primary_recipients[0].billing_info.address.admin_area_2 = faker.address.city()
		inv.primary_recipients[0].billing_info.address.admin_area_1 = "NE"
		inv.primary_recipients[0].billing_info.address.postal_code = "68046"
		inv.primary_recipients[0].billing_info.address.country_code = "US"
		inv.primary_recipients[0].billing_info.email_address = conEmail
		inv.primary_recipients[0].billing_info.phones = []
		inv.primary_recipients[0].billing_info.phones[0] = {}
		inv.primary_recipients[0].billing_info.phones[0].country_code = "001"
		inv.primary_recipients[0].billing_info.phones[0].national_number = "8882211161"
		inv.primary_recipients[0].billing_info.phones[0].phone_type = "HOME"
		inv.primary_recipients[0].billing_info.additional_info_value = faker.random.words()
		inv.primary_recipients[0].shipping_info = {}
		inv.primary_recipients[0].shipping_info.name = {}
		inv.primary_recipients[0].shipping_info.name.given_name = inv.primary_recipients[0].billing_info.name.given_name
		inv.primary_recipients[0].shipping_info.name.surname = inv.primary_recipients[0].billing_info.name.surname
		inv.primary_recipients[0].shipping_info.address = {}
		inv.primary_recipients[0].shipping_info.address.address_line_1 = faker.address.streetAddress()
		inv.primary_recipients[0].shipping_info.address.address_line_2 = faker.address.secondaryAddress()
		inv.primary_recipients[0].shipping_info.address.admin_area_2 = faker.address.city()
		inv.primary_recipients[0].shipping_info.address.admin_area_1 = "NE"
		inv.primary_recipients[0].shipping_info.address.postal_code = "68046"
		inv.primary_recipients[0].shipping_info.address.country_code = "US"

		//Items
		inv.items = []
		inv.items[0] = {}
		inv.items[0].name = faker.hacker.noun()
		inv.items[0].description = faker.random.words()
		inv.items[0].quantity = "" + Math.floor(Math.random() * 11) + 1 + ""
		inv.items[0].unit_amount = {}
		inv.items[0].unit_amount.currency_code = "USD"
		inv.items[0].unit_amount.value = "" + Math.floor(Math.random() * 11) + ""
		inv.items[0].tax = {}
		inv.items[0].tax.name = "Sales Tax"
		inv.items[0].tax.percent = "7.25"
		inv.items[0].discount = {}
		inv.items[0].discount.percent = "5"
		inv.items[0].unit_of_measure = "QUANTITY"

		//Configuration
		inv.configuration = {}
		inv.configuration.partial_payment = {}
		inv.configuration.partial_payment.allow_partial_payment = true
		inv.configuration.partial_payment.minimum_amount_due = {}
		inv.configuration.partial_payment.minimum_amount_due.currency_code = "USD"
		inv.configuration.partial_payment.minimum_amount_due.value = "20.00"
		inv.configuration.allow_tip = true
		inv.configuration.tax_calculated_after_discount = true
		inv.configuration.tax_inclusive = false

		//AMOUNT
		inv.amount = {}
		inv.amount.breakdown = {}
		inv.amount.breakdown.custom = {}
		inv.amount.breakdown.custom.label = "Packing Charges"
		inv.amount.breakdown.custom.amount = {}
		inv.amount.breakdown.custom.amount.currency_code = "USD"
		inv.amount.breakdown.custom.amount.value = "10.00"

		//AMOUNT.SHIPPING
		inv.amount.breakdown.shipping = {}
		inv.amount.breakdown.shipping.amount = {}
		inv.amount.breakdown.shipping.amount.currency_code = "USD"
		inv.amount.breakdown.shipping.amount.value = "10.00"
		inv.amount.breakdown.shipping.tax = {}
		inv.amount.breakdown.shipping.tax.name = inv.items[0].tax.name
		inv.amount.breakdown.shipping.tax.percent = inv.items[0].tax.percent

		//AMOUNT.DISCOUNT
		inv.amount.breakdown.discount = {}
		inv.amount.breakdown.discount.invoice_discount = {}
		inv.amount.breakdown.discount.invoice_discount.percent = "5"

	return inv
}
