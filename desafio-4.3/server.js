const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()

server.use(express.urlencoded( { extended: true }))
server.use(express.static('public'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('views', {
    autoescape: true,
    express: server,
    noCache: true,
    watch: true
})


server.listen(3000, function() {
    console.log('Server ON | Port: 3000')
})