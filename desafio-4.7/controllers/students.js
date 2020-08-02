const fs = require('fs') // File System
const data = require('../data.json')
const { age, date } = require('../utils')


// Index
exports.index = function(req, res) {
    // Criar separação de lista
    const listStudents = data.students.map(function(student) {
        const partStudent = {
            ...student,
            plus: student.plus.split(',') // Devide o Obejto em um Array
        }
        return partStudent
    })

    console.log(listStudents)

    return res.render('students/index', { students: listStudents})
}
// Create
exports.create = function(req, res) {
    return res.render('students/create')
}
// Post
exports.post = function(req, res) { //req.body e usado no method POST

    const keys = Object.keys(req.body) // Object é Contrutor | E o .keys transforma em uma array, mas somente dos Objectos


    // Validação se dos Dados estão Preenchidos
    for (key of keys) { // Enviando todos os objetos para KEY

        // req.body[elemento] | é igual o seletor | req.body.nome_do_elemento
        if (req.body[key] == "")
            return res.send('Please, fill all fields!')
    }

    // Desestruturando o Objeto
    let { avatar_url, birth, name, email, graduation, hours, plus } = req.body
    
    
    birth = Date.parse(birth) // Construtors Manuais | Data em milisegundos
    const created_at = Date.now() // Construtor que pega data atual
    const id = Number(data.students.length + 1) // Construtor para criar ID 

    // Organizar a sequencia dos dados
    data.students.push({
        id,
        avatar_url,
        name,
        email,
        birth,
        created_at,
        graduation,
        hours,
        plus,
        // password,
        // password2
    }) // PUSH vai adicionar um item após o outro no Array

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error!')

        return res.redirect('/')
    })

    // return res.send(req.body)
}
// Show
exports.show = function(req, res) { //req.params serve para coletar uma ID e USAR os DADOS dele
    const { id } = req.params

    const foundStudent = data.students.find(function(student) { //Encontrar o ID dentro do ARRAY
        return id == student.id
    })

    if(!foundStudent) return res.send('Student not found!') // Caso ele não encontrar o ID

    const student = {
        ...foundStudent, // Manda todos os dados do Array que o formulario gerou
        age: age(foundStudent.birth), // Gera a idade conforme o Data de Nascimentos escolhida
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at), // Formatar data yyyy-mm-dd
        plus: foundStudent.plus,
    }

    // console.log(student) // Visualizar dados

    // return res.send(foundStudent) // Dados esta indo em formato JSON
    return res.render('students/show', { student })

}
// Edit
exports.edit = function(req, res) { //req.params do Data.json 
    const { id } = req.params // Colocar os dados dentro de um Objeto

    const foundStudent = data.students.find(function(instructor) { //Encontrar o ID dentro do ARRAY
        return id == instructor.id
    })

    if(!foundStudent) return res.send('Student not found!') // Caso ele não encontrar o ID

    const student = {
        ...foundStudent, // Manda todos os dados do Array que o formulario gerou
        birth: date(foundStudent.birth) // Transforma os dados 2332321123 em data YYYY-MM-DD
    }

    // console.log(student) // Visualizar dados enviados no terminal

    return res.render('students/edit', { student })

}
// Update
exports.put = function(req, res) { // Atualiza os dados do Array
    const { id } = req.body // Pega o id da Página
    let index = 0 // Irá receber a resposta do foundStudent

    const foundStudent = data.students.find(function(student, foundIndex) { // Valida se existe esse index no Array
        if (id == student.id) {
            index = foundIndex 
            return true // Caso existir volta o numero do index que é verdadeiro
        }
    })

    if(!foundStudent) return res.send('Student not found!') // Agora não encontrando ele avisa que não tem

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth), // Transforma em data normal YYYY-MM-DD
        id: Number(req.body.id) //Transformar STRING em NUMBER
    }


    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write error!')

        return res.redirect(`/register/${id}`)
    })
}
// Delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filterStudents = data.students.filter(function(student) {
        return student.id != id
    })

    data.students = filterStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write file error!')

        return res.redirect('/register')
    })
}