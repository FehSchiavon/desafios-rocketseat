const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')

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
routes.get('/students', students.index)
routes.get('/students/create', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.post('/students', students.post)
routes.put('/students', students.put)
routes.delete('/students', students.delete)

module.exports = routes