const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const courses = require('./data')

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false
})

server.get("/", function(req, res) {
    const about = {
        company_logo: "https://rocketseat.gallerycdn.vsassets.io/extensions/rocketseat/rocketseatreactnative/2.2.0/1557162274650/Microsoft.VisualStudio.Services.Icons.Default",
        name_company: "Rocketseat",
        info_company: "As melhores tecnologias em programação, direto ao ponto e do jeito certo.",
        technology_company: [
            { name: "JavaScript" },
            { name: "React" },
            { name: "NodeJS" },
            { name: "React Native" }
        ]
    }


    return res.render("about", { about })
})

server.get("/courses", function(req, res) {
    return res.render("courses", { items: courses })
})

server.use(function(req, res) {
    return res.status(404).render("not-found");
})

server.listen(3000, function() {
    console.log("server is runing")
})