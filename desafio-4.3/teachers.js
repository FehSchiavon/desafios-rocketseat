const fs = require('fs') // File System
const data = require('./data.json')

// Função POST

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