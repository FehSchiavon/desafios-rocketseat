const express = require('express')
const routes = express.Router()
const teachers = require('./app/controllers/teachers')
const students = require('./app/controllers/students')

// Index não esta rederizando
routes.get('/', function(req, res) { 
    return res.redirect('/teachers')
}) 

// TEACHERS
routes.get('/teachers', teachers.index)
routes.get('/teachers/create', teachers.create)
routes.get('/teachers/:id', teachers.show)
routes.get('/teachers/:id/edit', teachers.edit)
routes.post('/teachers', teachers.post)
routes.put('/teachers', teachers.put)
routes.delete('/teachers', teachers.delete)

// MEMBER
routes.get('/students', students.index)
routes.get('/students/create', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.post('/students', students.post)
routes.put('/students', students.put)
routes.delete('/students', students.delete)

module.exports = routes

// HTTP VERBS
// GET: Receber RESOURCE
// POST: Criar um novo RESOURCE com dados enviados
// PUT: Atualizar RESOURCE
// DELETE: Deletar RESOURCE 