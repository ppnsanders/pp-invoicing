'use strict'

const request = require('request')
const reqUrl = Environment()

module.exports = (router) => {

  router.get('/', (req, res) => {
  	res.send(404)
  })

  router.post('/merchantEmail', (req, res) => {
  	const options = {
  			url: reqUrl + "/v1/identity/oauth2/userinfo?schema=paypalv1.1",
  			method: "GET",
  			headers: {
  				"Accept": "application/json",
            	"Content-Type": "application/json",
            	"Accept-Language": "en_US",
            	"Authorization": "Bearer " + req.body.access_token.creds.body.access_token
  			},
  			json: true
  		}
	    request(options, (err, response, body) => {
	    	if(err) {
	    		console.log("ERROR Getting merchantEmail: ", err)
	    		res.json({error: true, responseCode: 500, errorMessage: err })
	    	} else {
            console.log(response.body)
  	    		response.body.emails.forEach((email) => {
  	    			if(email.primary) {
  	    				if(email.confirmed) {
  	    					res.json({error: false, email: email.value })
  	    				}
  	    			}
  	    		})

	    	}
	    })
  })

  router.post('/generate', (req, res) => {
  		const reqBody = {
  				"grant_type": "authorization_code",
  				"code": req.body.code
  			}
	    const options = {
  			url: reqUrl + "/v1/oauth2/token",
  			method: "POST",
  			headers: {
  				"Accept": "application/json",
	        	"Content-Type": "application/x-www-form-urlencoded",
	        	"Accept-Language": "en_US"
  			},
  			auth: {
		    	"user": req.body.partner.client_id,
		    	"pass": req.body.partner.client_secret,
		    	"sendImmediately": true
		    },
  			form: reqBody,
  			json: true
  		}
	    request(options, (err, response, body) => {
	    	if(err) {
	    		console.log("ERROR Generating CREDS: ", err)
	    		res.json({error: true, responseCode: 500, errorMessage: err })
	    	} else {
	    		res.json({error: false, creds: response })
	    	}
	    })
  })



}
