'use strict'

angular.module('ppinvoicing').service('cwppServiceModel', function ($http, $cookies) {

function setup() {
	model.config = $cookies.getObject('invoicing-config')
}

let model = {
	config: {},
	setup: (model) => {
		return setup(model)
	}
}
 
return model
 
})