'use strict'

const request = require('request')
const reqUrl  = Environment()

module.exports = (router) => {

  router.post('/', (req, res) => {
    let reqObj = {}
        reqObj.url = reqUrl + "/v2/invoicing/invoices/" + req.body.queryString
        reqObj.method = "GET"
        reqObj.headers = {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + req.body.access_token
        }
    request(reqObj, (err, response, body) => {
      if(err) {
        console.log("ERROR GETTING INVOICE LIST: ", err)
        res.json({error: true, responseCode: 500, errorMessage: err})
      } else {
        res.json({ error: false, invoices: JSON.parse(body) })
      }
    })
  })

  router.get('/', (req, res) => {
    //res.send(404)
    res.json({error: true, responseCode: 404})
  })

}
