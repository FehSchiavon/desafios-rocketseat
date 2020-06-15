const express = require('express')
const routes = express.Router()

routes.get('/', function(req, res) {
    return res.render('teachers/login')
})

routes.get('/register', function(req, res) {
    return res.render('teachers/register')
})

routes.post('/', function(req, res) {
    return res.send('Recebido')
})

module.exports = routes