'use strict'

const sandbox = Environment()
const faker = require('faker')

module.exports = function PaymentModel(inv) {
	const dt = new Date()
	const pmtDate = "" + dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + (dt.getDate())).slice(-2) + ""

	let pmt = {}
		pmt.payment_id = ""
		pmt.payment_date = pmtDate
		pmt.method = "CASH"
		pmt.note = faker.random.words()

		pmt.amount = {}
		pmt.amount.currency_code = "USD"
		pmt.amount.value = "" + Math.floor(Math.random() * 11) + ""

		pmt.shipping_info = {}
		pmt.shipping_info.business_name = inv.primary_recipients[0].billing_info.email_address
		pmt.shipping_info.name = {}
		pmt.shipping_info.address = {}
		pmt.shipping_info.address.address_details = {}

		pmt.shipping_info.name.prefix = ""

		if(typeof inv.primary_recipients[0].billing_info.name.given_name !== 'undefined') {
			pmt.shipping_info.name.given_name = inv.primary_recipients[0].billing_info.name.given_name
		} else {
			pmt.shipping_info.name.given_name = ""
		}

		if(typeof inv.primary_recipients[0].billing_info.name.surname !== 'undefined') {
			pmt.shipping_info.name.surname = inv.primary_recipients[0].billing_info.name.surname
		} else {
			pmt.shipping_info.name.surname = ""
		}

		if(typeof inv.primary_recipients[0].billing_info.name.given_name !== 'undefined' && typeof inv.primary_recipients[0].billing_info.name.surname !== 'undefined') {
			pmt.shipping_info.name.full_name = inv.primary_recipients[0].billing_info.name.given_name + " " + inv.primary_recipients[0].billing_info.name.surname
		} else {
			pmt.shipping_info.name.full_name = ""
		}
		
		pmt.shipping_info.name.middle_name = ""
		pmt.shipping_info.name.suffix = ""
		pmt.shipping_info.name.alternate_full_name = ""
		

		if(typeof inv.primary_recipients[0].shipping_info.address.address_line_1 !== 'undefined') {
			pmt.shipping_info.address.address_line_1 = inv.primary_recipients[0].shipping_info.address.address_line_1
		} else {
			pmt.shipping_info.address.address_line_1 = ""
		}
		
		if(typeof inv.primary_recipients[0].shipping_info.address.address_line_2 !== 'undefined') {
			pmt.shipping_info.address.address_line_2 = inv.primary_recipients[0].shipping_info.address.address_line_2
			pmt.shipping_info.address.address_line_3 = ""
		} else {
			pmt.shipping_info.address.address_line_2 = ""
			pmt.shipping_info.address.address_line_3 = ""
		}

		pmt.shipping_info.address.admin_area_4 = ""
		pmt.shipping_info.address.admin_area_3 = ""
		if(typeof inv.primary_recipients[0].shipping_info.address.admin_area_2 !== 'undefined') {
			pmt.shipping_info.address.admin_area_2 = inv.primary_recipients[0].shipping_info.address.admin_area_2
		} else {
			pmt.shipping_info.address.admin_area_2 = ""
		}

		if(typeof inv.primary_recipients[0].shipping_info.address.admin_area_2 !== 'undefined') {
			pmt.shipping_info.address.admin_area_1 = inv.primary_recipients[0].shipping_info.address.admin_area_1
		} else {
			pmt.shipping_info.address.admin_area_1 = ""
		}

		if(typeof inv.primary_recipients[0].shipping_info.address.postal_code !== 'undefined') {
			pmt.shipping_info.address.postal_code = inv.primary_recipients[0].shipping_info.address.postal_code
		} else {
			pmt.shipping_info.address.postal_code = ""
		}
		
		if(typeof inv.primary_recipients[0].shipping_info.address.country_code !== 'undefined') {
			pmt.shipping_info.address.country_code = inv.primary_recipients[0].shipping_info.address.country_code
		} else {
			pmt.shipping_info.address.country_code = ""
		}

		pmt.shipping_info.address.address_details.street_number = ""
		pmt.shipping_info.address.address_details.street_name = ""
		pmt.shipping_info.address.address_details.street_type = ""
		pmt.shipping_info.address.address_details.delivery_service = ""
		pmt.shipping_info.address.address_details.building_name = ""
		pmt.shipping_info.address.address_details.sub_building = ""

	return pmt
}
