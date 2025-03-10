const express = require('express')
const routes = express.Router()
const home = require('./controllers/home')
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')

routes.get('/', function(req, res) {
    return res.redirect('/home')
})

routes.get('/home', home.index)

// Teachers
// CRUD 
routes.get("/teachers", teachers.index)
routes.get("/teachers/create", teachers.create)
routes.get('/teachers/:id', teachers.show)
routes.get('/teachers/:id/edit', teachers.edit)
routes.post('/teachers', teachers.post)
routes.put('/teachers', teachers.put)
routes.delete('/teachers', teachers.delete)

// Students
// CRUD
routes.get('/students', students.index)
routes.get('/students/create', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.post('/students', students.post)
routes.put('/students', students.put)
routes.delete('/students', students.delete)

module.exports = routes