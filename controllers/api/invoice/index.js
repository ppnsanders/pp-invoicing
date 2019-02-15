'use strict'

const request = require('request')
const sandbox = Environment()

module.exports = (router) => {

  router.get('/', (req, res) => {
    //res.send(404)
    res.json({error: true, responseCode: 404})
  })

  router.post('/access_token', (req, res) => {
  	let reqObj = {}
  	let reqUrl = ""
	  	if(sandbox) {
	  		reqUrl = "https://api.sandbox.paypal.com/v1/oauth2/token"
	  	} else {
	  		reqUrl = "https://api.paypal.com/v1/oauth2/token"
	  	}
	    reqObj.url = reqUrl
	    reqObj.method = "POST"
	    reqObj.auth = {
	    	"user": req.body.client_id,
	    	"pass": req.body.client_secret,
	    	"sendImmediately": true
	    }
	    reqObj.headers = {
	        "Accept": "application/json",
	        "Content-Type": "application/x-www-form-urlencoded",
	        "Accept-Language": "en_US"
	    }
	    reqObj.form = {
	    	"grant_type": "client_credentials"
	    }
	    request(reqObj, (err, response, body) => {
	    	if(err) {
	    		console.log("ERROR REQUESTING CREDS: ", err)
	    		res.json({error: true, responseCode: 500, errorMessage: err })
	    	} else {
	    		const access_token = JSON.parse(body)
	    		res.json({error: false, creds: access_token })
	    	}
	    })
    })

}
