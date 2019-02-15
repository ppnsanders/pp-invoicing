'use strict'

const request = require('request')

module.exports = (router) => {

  router.get('/', (req, res) => {
    //res.send(404)
    res.json({error: true, responseCode: 404})
  })

}
