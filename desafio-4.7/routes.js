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
// CRUD
routes.get('/students/:id', students.index)
routes.get('/students/:id', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.post('/students', students.post)
routes.put('/students', students.put)
routes.delete('/students', students.delete)

module.exports = routes