const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`
        SELECT *
        FROM my_student`, function(err, results) {
            if(err) throw `Database Error! ${err}`
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO my_student (
                avatar_url,
                name,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
                created_at,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            date(Date.now()).iso,
            data.teacher_id
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`
            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT my_student.*, my_teacher.name AS teacher_name 
        FROM my_student 
        LEFT JOIN my_teacher ON (my_student.teacher_id = my_teacher.id)
        WHERE my_student.id = $1`, [id], function(err, results) {
                if(err) throw `Database Error! ${err}`
                callback(results.rows[0])
            }
        )
    },
    update(data, callback) {
        const query = `
        UPDATE my_student SET
            avatar_url=($1),
            name=($2),
            birth_date=($3),
            education_level=($4),
            class_type=($5),
            subjects_taught=($6),
            teacher_id=($7)
        WHERE id = ($8)
        `
        const values = [
            data.avatar_url,
            data.name,
            data.birth_date,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            data.teacher,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error! ${err}`
            callback()
        }) 
    },
    delete(id, callback) {
        db.query(`DELETE FROM my_student WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error! ${err}`
            return callback()
        })
    },
    teachersSelectOptions(callback) {
        db.query(`SELECT name, id FROM my_teacher`, function(err, results) {
            if (err) throw 'Database Error!'
            callback(results.rows)
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(
                SELECT count(*) FROM my_student
            ) AS total`

        if (filter) {
            filterQuery = `
            WHERE my_student.name ILIKE '%${filter}%'
            OR my_student.email ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM my_student
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT my_student.*, ${totalQuery}
        FROM my_student
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function(err, results) {
            if (err) throw 'Database Error!'

            callback(results.rows)
        })
    }
}