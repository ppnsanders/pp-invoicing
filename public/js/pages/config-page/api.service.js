'use strict'

angular.module('ppinvoicing').service('configServiceModel', function ($http, $cookies, $window) {

function setup() {
	model.config = $cookies.getObject('invoicing-config')
	if(typeof model.config !== 'undefined') {
		if(typeof model.config.partner !== 'undefined') {
			model.getAccessToken()
		} else {
			model.showConfigModal()
		}
	} else {
		//no config, show settings modal
		model.config = {},
		model.config.partner = {}
		model.config.partner.email = ""
		model.config.partner.client_id = ""
		model.config.partner.client_secret = ""
		model.config.merchant = {}
		model.config.merchant.email = ""
		model.config.consumer = {}
		model.config.consumer.email = ""
		model.config.access_token = ""
		model.config.refresh_token = ""
		model.config.history = []
		$cookies.putObject('invoicing-config', model.config)
		model.showConfigModal()
	}
}

function useDefault() {
	$('#useDefaultButton').hide()
	$('#cancelEditButton').hide()
	$('#connectMerchantButton').hide()
	$('#errorMsg').hide()
	model.showLoader()
	model.config = {
		partner: {
			email: "githubMerchant@paypal.com",
			client_id: "AWAbuRjmtZicNcbRrtcJNnJgcSY9zpDz7geeAAHu4yJF2AmVbr7DF7nQ7o77d4xg1p6KDJVWhbipYyAG",
			client_secret: "EG6K73OvNJOH9hqG4TOc-G8hswFyXlfpYwQZKTe6_trB4_8nXkV-o1cUNMJHpoEoU6q5lEE3peXLLwat"
		},
		merchant: {
			email: "invSender@paypal.com"
		},
		consumer: {
			email: "invReceiver@paypal.com"
		},
		access_token: "",
		refresh_token: "",
		history: []
	}
	model.getAccessToken()
	$cookies.putObject('invoicing-config', model.config)
	model.errorMsg.message = ""
	setTimeout(() => {
		model.hideLoader()
	}, 500)
}

function getAccessToken() {
		const reqUrl = '/api/invoice/access_token'
		const config = {
	        'xsrfHeaderName': 'X-CSRF-TOKEN',
	        'xsrfCookieName': 'XSRF-TOKEN'
	    }
		return $http.post(reqUrl, model.config.partner, config).then((response) => {
					model.config.access_token = response.data.creds.access_token
					$('#accessTokenField').show()
					$cookies.putObject('invoicing-config', model.config)	
		})
}

function cancelEditConfig() {
	$('#configModal').modal('hide')
}

function showConfigModal() {
	$('#configModal').modal('show')
}

function showLoader() {
	$('#configured').hide()
	$('#configModalLoading').show()
}

function hideLoader() {
	$('#configModalLoading').hide()
	$('#configured').show()
}

function saveSettings() {
	const config = validateConfig()
	if(config) {
		$cookies.putObject('invoicing-config', model.config)
		$('#configModal').modal('hide')
		setTimeout(() => {
					$window.location.reload();
		}, 200)
	} else {
		//do nothing, show errors
		return false
	}
}

function validateConfig() {
	model.errorMsg.message = []
	const conConfig = model.validateConsumerConfig()
	const merConfig = model.validateMerchantConfig()
	const parConfig = model.validatePartnerConfig()
	if(conConfig === true && merConfig === true && parConfig === true) {
		return true
	} else {
		return false
	}
}

function validateConsumerConfig() {
	if(typeof model.config !== 'undefined'){
		if(typeof model.config.consumer !== 'undefined') {
			if(typeof model.config.consumer.email !== 'undefined') {
				return true
			} else {
				model.errorMsg.message.push("You must have a Consumer Email Address")
				$('#errorMsg').show()
				return false
			}
		} else {
			model.errorMsg.message.push("You must have a Consumer Email Address")
			$('#errorMsg').show()
			return false
		}
	} else {
		model.errorMsg.message.push("You must have a Consumer Email Address")
		$('#errorMsg').show()
		return false
	}
}

function validateMerchantConfig() {
	if(typeof model.config !== 'undefined'){
		if(typeof model.config.merchant !== 'undefined') {
			if(typeof model.config.merchant.email !== 'undefined') {
				return true
			} else {
				model.errorMsg.message.push("You must have a Merchant Email Address")
				$('#errorMsg').show()
				return false
			}
		} else {
			model.errorMsg.message.push("You must have a Merchant Email Address")
			$('#errorMsg').show()
			return false
		}
	} else {
		model.errorMsg.message.push("You must have a Merchant Email Address")
		$('#errorMsg').show()
		return false
	}
}

function validatePartnerConfig() {
	if(typeof model.config !== 'undefined'){
		if(typeof model.config.partner !== 'undefined') {
			if(typeof model.config.partner.client_id !== 'undefined') {
				if(typeof model.config.partner.client_secret !== 'undefined') {
					if(typeof model.config.partner.email !== 'undefined') {
						return true
					} else {
						model.errorMsg.message.push("You must have a Partner Email Address")
						$('#errorMsg').show()
						return false
					}
				} else {
					model.errorMsg.message.push("You must have a Partner Client_Secret")
					$('#errorMsg').show()
					return false
				}
			} else {
				model.errorMsg.message.push("You must input a Partner Client_Id")
				$('#errorMsg').show()
				return false
			}
		} else {
			model.errorMsg.message.push("You must input Partner Details (email, client_id, client_secret)")
			$('#errorMsg').show()
			return false
		}
	} else {
		model.errorMsg.message.push("You must input Partner Details")
		$('#errorMsg').show()
		return false
	}
}

function connectMerchant() {
	if(model.validatePartnerConfig()) {
		$cookies.putObject('invoicing-config', model.config)
		$('#configured').hide()
		$('#useDefaultButton').hide()
		$('#cancelEditButton').hide()
		$('#saveSettingsButton').hide()
		$('#connectMerchantButton').hide()
		$('#cancelConnectMerchantButton').show()
		$('#connectMerchant').show()
	} else {
		//show errors
	}
}

function cancelConnectMerchant() {
	$('#cancelConnectMerchantButton').hide()
	$('#connectMerchant').hide()
	$('#configured').show()
	$('#useDefaultButton').show()
	$('#cancelEditButton').show()
	$('#saveSettingsButton').show()
	$('#connectMerchantButton').show()
}

function getTokenFromCode() {
	model.showConfigModal()
	$('#configured').hide()
	$('#configModalLoading').show()
	const reqUrl = "/api/config/generate"
	const config = {
        'xsrfHeaderName': 'X-CSRF-TOKEN',
        'xsrfCookieName': 'XSRF-TOKEN'
    }
    const reqObj = {}
    	  reqObj.code = model.query.code
    	  reqObj.partner = {}
    	  reqObj.partner.client_id = model.config.partner.client_id
    	  reqObj.partner.client_secret = model.config.partner.client_secret
	return $http.post(reqUrl, reqObj, config).then((response) => {
		model.config.access_token = response.data.creds.body.access_token
		model.config.refresh_token = response.data.creds.body.refresh_token
		model.getMerchantEmail((err, email) => {
			if(err) { 
				console.log('error getting merchant email: ', err)
			} else {
				$('#configModalLoading').hide()
				$('#useDefaultButton').hide()
				$('#cancelEditButton').hide()
				$('#connectMerchantButton').hide()
				$('#configured').show()
			}
			
		})
	})
}

function getMerchantEmail(cb) {
	const reqUrl = "/api/config/merchantEmail"
	const config = {
        'xsrfHeaderName': 'X-CSRF-TOKEN',
        'xsrfCookieName': 'XSRF-TOKEN'
    }
    $http.post(reqUrl, , config).then((response) => {
		model.config.merchant.email = response.data.email
		$cookies.putObject('invoicing-config', model.config)
		cb(null, response.data.email)
	})
}



let model = {
	config: {},
	query: {},
	access_token: "",
	refresh_token: "",
	errorMsg: { message: []},
	setup: (model) => {
		return setup(model)
	},
	useDefault: (model) => {
		return useDefault(model)
	},
	getAccessToken: (model) => {
		return getAccessToken(model)
	},
	cancelEditConfig: (model) => {
		return cancelEditConfig(model)
	},
	showConfigModal: (model) => {
		return showConfigModal(model)
	},
	saveSettings: (model) => {
		return saveSettings(model)
	},
	connectMerchant: (model) => {
		return connectMerchant(model)
	},
	cancelConnectMerchant: (model) => {
		return cancelConnectMerchant(model)
	},
	getTokenFromCode: (model) => {
		return getTokenFromCode(model)
	},
	getMerchantEmail: (model) => {
		return getMerchantEmail(model)
	},
	validateConfig: (model) => {
		return validateConfig(model)
	},
	validatePartnerConfig: (model) => {
		return validatePartnerConfig(model)
	},
	validateMerchantConfig: (model) => {
		return validateMerchantConfig(model)
	},
	validateConsumerConfig: (model) => {
		return validateConsumerConfig(model)
	},
	showLoader: (model) => {
		return showLoader(model)
	},
	hideLoader: (model) => {
		return hideLoader(model)
	}
}
 
return model
 
})
