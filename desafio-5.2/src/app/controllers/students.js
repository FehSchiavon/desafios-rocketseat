const { age, date } = require('../../lib/utils')
const Student = require('../models/Student')

module.exports = {
    index(req, res) {
        Student.all(function(students) {
            return res.render('students/index', { students })
        })
    },
    create(req, res) {
        return res.render('students/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }
        
        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`)
        })
    
    },
    show(req, res) {
        Student.find(req.params.id), function(student) {
            if(!student) return res.send('Student not found')

            student.age = age(student.birth) // Chamando instruções do utils.js
            
            return res.render('student/show', { student })
        }
    },
    edit(req, res) {
        Student.find(req.params.id , function(student) {
            if (!student) return res.send('Student not found!')
            student.birth = date(student.birth).iso
            return res.render('student/edit', { student })
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields')
            }
        }
    
        Student.update(req.body, function() {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        Student.delete(req.body.id, function() {
            return res.redirect(`/students`)
        })
    },
}