'use strict'

angular.module('ppinvoicing').service('configServiceModel', function ($http, $cookies) {

function setup() {
	model.config = $cookies.getObject('invoicing-config')
	if(typeof model.config === 'undefined') {
		model.useDefault()
	} else {
		model.getAccessToken()
	}
}

function useDefault() {
	if( $("#configModal").is(':visible') ){
		$('#configModal').modal('hide')
	} else {
		//nada
	}
	model.config = {
		partner: {
			email: "githubMerchant@paypal.com",
			client_id: "AaG-RtYFtgzsjnbdeCyCRUvvc-MqGS5iBPlFEFbD3rQQqCQkkSFfwgfV7_Aj9cBhLN8N0RYYDCYD8ZF3",
			client_secret: "EHMZH8qQ3cyzNQT_3xJo6PbblNOxfXVkOtC0PV_m9HLUN5HrkXgrzQoXs4t_-xAg05fl60HS8eM8iNPm"
		},
		merchant: {
			email: "invSender@paypal.com"
		},
		consumer: {
			email: "invReceiver@paypal.com"
		}
	}
	$cookies.putObject('invoicing-config', model.config)
	model.getAccessToken()
}

function getAccessToken() {
	$cookies.putObject('inv-auth', {})
	const reqUrl = '/api/invoice/access_token'
	const config = {
        'xsrfHeaderName': 'X-CSRF-TOKEN',
        'xsrfCookieName': 'XSRF-TOKEN'
    }
	return $http.post(reqUrl, model.config.partner, config).then((response) => {
			model.access_token = response.data
			$cookies.putObject('inv-auth', model.access_token)
		})
}

function cancelEditConfig() {
	$('#configModal').modal('hide')
}

function showConfigModal() {
	$('#configModal').modal('show')
}

function saveSettings() {
	$cookies.putObject('invoicing-config', model.config)
	model.getAccessToken()
}


let model = {
	config: {},
	access_token: "",
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
	}
}
 
return model
 
})
