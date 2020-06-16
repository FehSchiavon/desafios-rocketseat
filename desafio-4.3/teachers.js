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

    data.teachers.push(req.body) // PUSH vai adicionar um item após o outro no Array

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Write file error!')

        return res.redirect('/')
    })

    // return res.send(req.body)
}


// Update

// Delete