const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.set('view engine', 'html')

nunjucks.configure('views', {
    express: server
})

server.use(express.static('public'))

server.get('/', function(req, res) {
    return res.send('ON')
})

server.listen(7000, function() {
    console.log("Server ON | Port: 7000")
})