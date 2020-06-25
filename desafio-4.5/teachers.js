const fs = require('fs') // File System
const data = require('./data.json')
const { age, date } = require('./utils')

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
        plus: foundTeacher.plus.split(","), // Separa os textos por virgula 
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at) // Formatar data yyyy-mm-dd
    }

    // console.log(teacher) // Visualizar dados

    // return res.send(foundTeacher) // Dados esta indo em formato JSON
    return res.render('teachers/show', { teacher })

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
    
}


// Delete