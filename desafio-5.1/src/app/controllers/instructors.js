const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.render('instructors/index', { instructors: data.instructors })
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    post(req, res) {

    },
    show(req, res) {},
    edit(req, res) {},
    put(req, res) {},
    delete(req, res) {},
}


exports.index = function(req, res) {
    return res.render('instructors/index', { instructors: data.instructors })
}
exports.create = function(req, res) {
    return res.render('instructors/create')
}
exports.post = function(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields')
        }
    }
    
    let { avatar_url, birth, name, services, gender } = req.body

    return
    

}
exports.show = function(req, res) {
    return
}
exports.edit = function(req, res) {
    return
}
exports.put = function(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields')
        }
    }

    return
}
exports.delete = function(req, res) {
    return
}