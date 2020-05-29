const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res) {
    // return res.redirect('/teachers')
    return res.send('Rotas ON')
})

routes.get('/teachers', function(req, res) {
    return res.render('user/index')
})

module.exports = routes