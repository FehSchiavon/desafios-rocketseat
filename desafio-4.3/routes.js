const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res) {
    res.send('Routas')
})

module.exports = routes