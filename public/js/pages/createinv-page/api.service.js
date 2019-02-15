'use strict'

angular.module('ppshopping').service('createinvServiceModel', function ($http, $cookies) {

function setup() {
	model.creds = $cookies.getObject('inv-auth')
	model.access_token = model.creds.creds.access_token
}

//build invoice request
//show invoice request
//create invoice

let model = {
	creds: {},
	access_token: "",
	setup: (model) => {
		return setup(model)
	}
}
 
return model
 
})