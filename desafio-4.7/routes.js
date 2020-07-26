const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')
const students = require('')

routes.get('/', function(req, res) {
    return res.redirect('/login')
})

// Teachers
routes.get('/login', teachers.indexLogin)
routes.get('/register', teachers.indexRegister)
routes.get("/register/list", teachers.list) // LIST
// CRUD 
routes.post('/register', teachers.post)
routes.get('/register/:id', teachers.show)
routes.get('/register/:id/edit', teachers.edit)
routes.put('/register', teachers.put)
routes.delete('/register', teachers.delete)

// Students
routes.post('/register', students.post)
routes.get('/register/:id', students.show)
routes.get('/register/:id/edit', students.edit)
routes.put('/register', students.put)
routes.delete('/register', students.delete)

module.exports = routes