'use strict'

const request = require('request')
const reqUrl  = Environment()
const invModel = require('../../../models/invoice')

module.exports = (router) => {

  router.get('/', (req, res) => {
    //res.send(404)
    res.json({error: true, responseCode: 404})
  })

  router.post('/byId', (req, res) => {
  	let reqObj = {}
  	    reqObj.url = reqUrl + "/v2/invoicing/invoices/" + req.body.invoiceId
  	    reqObj.method = "GET"
  	    reqObj.headers = {
  	    	"Content-Type": "application/json",
  	    	"Authorization": "Bearer " + req.body.access_token
  	    }
  	request(reqObj, (err, response, body) => {
  		if(err) {
  			console.log("ERROR GETTING INVOICE: ", err)
  			res.json({error: true, responseCode: 500, errorMessage: err})
  		} else {
  			res.json({ error: false, invoice: JSON.parse(body) })
  		}
  	})
  })

  router.post('/access_token', (req, res) => {
  	let reqObj = {}
	    reqObj.url = reqUrl + "/v1/oauth2/token"
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

  	router.post('/getObject', (req, res) => {
      console.log('req: ', req.body)
      const options = {
        url: reqUrl + "/v2/invoicing/generate-next-invoice-number",
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Accept-Language": "en_US",
          "Authorization": "Bearer " + req.body.access_token
        },
        body: {},
        json: true
      }
      request(options, (err, response, body) => {
        if(err) {
          console.log("ERROR CREATING INVOICE NUMBER: ", err)
          res.json({error: true, responseCode: 500, errorMessage: err })
        } else {
          console.log('invNum response: ', response.body)
          let invoiceObj = new invModel(req.body, response.body.invoice_number)
          res.json(invoiceObj)
        }
      })
  	})

  	router.post('/create', (req, res) => {
  		const options = {
  			url: reqUrl + "/v2/invoicing/invoices",
  			method: "POST",
  			headers: {
  				"Accept": "application/json",
            	"Content-Type": "application/json",
            	"Accept-Language": "en_US",
            	"Authorization": "Bearer " + req.body.access_token
  			},
  			body: req.body.invoice,
  			json: true
  		}
	    request(options, (err, response, body) => {
	    	if(err) {
	    		console.log("ERROR CREATING INVOICE: ", err)
	    		res.json({error: true, responseCode: 500, errorMessage: err })
	    	} else {
	    		res.json({error: false, invResponse: response })
	    	}
	    })
  	})

  	router.post('/send', (req, res) => {
  		const reqBody = {}
  		if(req.body.body.send_to_invoicer === false && req.body.body.send_to_recipient === false) {
  			reqBody.send_to_invoicer = false
  			reqBody.send_to_recipient = false
  		} else {
  			reqBody = req.body.body
  		}
  		const options = {
  			url: req.body.url,
  			method: "POST",
  			headers: {
  				"Accept": "application/json",
            	"Content-Type": "application/json",
            	"Accept-Language": "en_US",
            	"Authorization": "Bearer " + req.body.access_token
  			},
  			body: reqBody,
  			json: true
  		}
	    request(options, (err, response, body) => {
	    	if(err) {
	    		console.log("ERROR CREATING INVOICE: ", err)
	    		res.json({error: true, responseCode: 500, errorMessage: err })
	    	} else {
	    		res.json({error: false, sendResponse: response })
	    	}
	    })
  	})
}
