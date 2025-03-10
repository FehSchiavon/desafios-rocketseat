const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()

server.use(express.static('public'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: true,
    noCache: true,

})

server.listen(7000, function(){
    console.log('Server ON | Port: 7000')
})