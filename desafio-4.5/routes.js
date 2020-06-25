const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', function(req, res) {
    return res.redirect('/login')
})

routes.get('/login', function(req, res) {
    return res.render('teachers/login')
})

routes.get('/register', function(req, res) {
    return res.render('teachers/register')
})

routes.post('/register', teachers.post)

routes.get('/register/:id', teachers.show)

routes.get('/register/:id/edit', teachers.edit)

routes.put('/register', teachers.put)

module.exports = routes