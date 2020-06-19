const fs = require('fs') // File System
const data = require('./data.json')
const { age } = require('./utils')

// Função POST

// Resuminho
// req.query : ?id=1
// req.body : dados gerados pelo formulario
// req.params : /:id

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
        plus: foundTeacher.plus.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    console.log(teacher)

    // return res.send(foundTeacher) // Dados esta indo em formato JSON
    return res.render('teachers/show', { teacher: foundTeacher })

}


// Create
exports.post = function(req, res) { //req.body e usado no method POST

    const keys = Object.keys(req.body) // Object é Contrutor | E o .keys transforma em uma array, mas somente dos Objectos


    // Validação se dos Dados estão Preenchidos
    for (key of keys) { // Enviando todos os objetos para KEY

        // req.body[elemento] | é igual o seletor | req.body.nome_do_elemento
        if (req.body[key] == "")
            return res.send('Please, fill all fields!')
    }

    // Desestruturando o Objeto
    let { avatar_url, birth, name, school, category, plus, password, password2 } = req.body
    
    
    birth = Date.parse(birth) // Construtors Manuais | Data em milisegundos
    const created_at = Date.now() // Construtor que pega data atual
    const id = Number(data.teachers.length + 1) // Construtor para criar ID 

    // Organizar a sequencia dos dados
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        created_at,
        school,
        category,
        plus,
        password,
        password2
    }) // PUSH vai adicionar um item após o outro no Array

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error!')

        return res.redirect('/')
    })

    // return res.send(req.body)
}

// Update


// Delete