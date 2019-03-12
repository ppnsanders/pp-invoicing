'use strict'

const request = require('request')
const reqUrl  = Environment()
const Payment = require('../../../models/payment')

module.exports = (router) => {

  router.post('/', (req, res) => {
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
        let resp = JSON.parse(body)
        if(resp.status === 'SENT' || resp.status === 'UNPAID' || resp.status === 'PARTIALLY_PAID' || resp.status === 'PAYMENT_PENDING') {
          let paymentObj = new Payment(resp)
          res.json({ error: false, payment: paymentObj })  
        } else {
          res.json({ error: true, responseCode: 400, errorMessage: "Invalid Status, no Payments accepted.", invoice: resp })
        }
        
      }
    })
  })

  router.post('/create', (req, res) => {
    let reqObj = {}
        reqObj.url = reqUrl + "/v2/invoicing/invoices/" + req.body.invoiceId + "/payments"
        reqObj.method = "POST"
        reqObj.headers = {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + req.body.access_token
        }
        reqObj.body = req.body.payment
        reqObj.json = true
        request(reqObj, (err, response, body) => {
          if(err) {
            res.json({ error: true, responseCode: 500, errorMessage: err })
          } else {
            res.json({ error: false, paymentResponse: response })
          }
        })
  })

  router.get('/', (req, res) => {
    //res.send(404)
    res.json({error: true, responseCode: 404})
  })

}
