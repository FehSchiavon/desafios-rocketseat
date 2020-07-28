const fs = require('fs') // File System
const data = require('../data.json')
const { age, date } = require('../utils')


// Index
exports.index = function(req, res) {
    // Criar separação de lista
    const listTearchers = data.teachers.map(function(teacher) {
        const partTeacher = {
            ...teacher,
            plus: teacher.plus.split(',') // Devide o Obejto em um Array
        }
        return partTeacher
    })

    console.log(listTearchers)

    return res.render('teachers/list', { teachers: listTearchers})
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
    let { avatar_url, birth, nickname, name, graduation, category, plus, password, password2 } = req.body
    
    
    birth = Date.parse(birth) // Construtors Manuais | Data em milisegundos
    const created_at = Date.now() // Construtor que pega data atual
    const id = Number(data.teachers.length + 1) // Construtor para criar ID 

    // Organizar a sequencia dos dados
    data.teachers.push({
        id,
        avatar_url,
        nickname,
        name,
        birth,
        created_at,
        graduation,
        category,
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

    const foundTeacher = data.teachers.find(function(teacher) { //Encontrar o ID dentro do ARRAY
        return id == teacher.id
    })

    if(!foundTeacher) return res.send('Instructor not found!') // Caso ele não encontrar o ID

    const teacher = {
        ...foundTeacher, // Manda todos os dados do Array que o formulario gerou
        age: age(foundTeacher.birth), // Gera a idade conforme o Data de Nascimentos escolhida
        // plus: foundTeacher.plus.split(","), // Separa os textos por virgula 
        plus: foundTeacher.plus,
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at) // Formatar data yyyy-mm-dd
    }

    // console.log(teacher) // Visualizar dados

    // return res.send(foundTeacher) // Dados esta indo em formato JSON
    return res.render('teachers/show', { teacher })

}
// Edit
exports.edit = function(req, res) { //req.params do Data.json 
    const { id } = req.params // Colocar os dados dentro de um Objeto

    const foundTeacher = data.teachers.find(function(instructor) { //Encontrar o ID dentro do ARRAY
        return id == instructor.id
    })

    if(!foundTeacher) return res.send('Teacher not found!') // Caso ele não encontrar o ID

    const teacher = {
        ...foundTeacher, // Manda todos os dados do Array que o formulario gerou
        birth: date(foundTeacher.birth) // Transforma os dados 2332321123 em data YYYY-MM-DD
    }

    // console.log(teacher) // Visualizar dados enviados no terminal

    return res.render('teachers/edit', { teacher })

}
// Update
exports.put = function(req, res) { // Atualiza os dados do Array
    const { id } = req.body // Pega o id da Página
    let index = 0 // Irá receber a resposta do foundTeacher

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) { // Valida se existe esse index no Array
        if (id == teacher.id) {
            index = foundIndex 
            return true // Caso existir volta o numero do index que é verdadeiro
        }
    })

    if(!foundTeacher) return res.send('Teacher not found!') // Agora não encontrando ele avisa que não tem

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth), // Transforma em data normal YYYY-MM-DD
        id: Number(req.body.id) //Transformar STRING em NUMBER
    }


    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write error!')

        return res.redirect(`/register/${id}`)
    })
}
// Delete
exports.delete = function(req, res) {
    const { id } = req.body

    const filterTeachers = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filterTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write file error!')

        return res.redirect('/register')
    })
}