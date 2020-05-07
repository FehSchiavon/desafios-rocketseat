const express = require('express')
const server = express()

server.get("/", function(req, res) {
    return res.send("Hehe, deu certo!")
})

server.listen(7000, function(){
    console.log("server is runing")
})