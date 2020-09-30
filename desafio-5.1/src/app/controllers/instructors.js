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
    // req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return  id == instructor.id
    })

    if(!foundInstructor) return res.send('Instructor not found!')

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render('instructors/edit', { instructor })
}
exports.put = function(req, res) {
    // req.params
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })

    if(!foundInstructor) return res.send('Instructor not found!')

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send('Write error!')

        return res.redirect(`/instructors/${id}`)
    })
}
exports.delete = function(req, res) {
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Write file error!')

        return res.redirect('/instructors')
    })
}