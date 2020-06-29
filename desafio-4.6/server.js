const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override') // Ativando PUT e DELETE que não tem nativos

const server = express()

server.use(express.urlencoded( { extended: true })) // Ativando req.body (Routes POST)
server.use(express.static('public'))
server.use(methodOverride('_method')) // Deixar em cima das rotas para para transformar e depois enviar para as rotas
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('views', {
    autoescape: true,
    express: server,
    noCache: true,
})


server.listen(3000, function() {
    console.log('Server ON | Port: 3000')
})