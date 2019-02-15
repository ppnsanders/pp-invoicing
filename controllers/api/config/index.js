'use strict'

const request = require('request')
const paypalConfig = require('../../../config/paypal.json')

module.exports = (router) => {

  router.get('/', (req, res) => {
  	res.json(paypalConfig)
  })

}
