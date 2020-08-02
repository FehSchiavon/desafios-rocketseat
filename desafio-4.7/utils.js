module.exports = {
    age: function(timestamp) {
        const today = new Date() // Puxa a data atual gerada no sistema
        const birthDate = new Date(timestamp) // Pega valor passado e transforma em data

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 ||
            month == 0 &&
            today.getDate() <= birthDate.getDate()) {
            age = age - 1
        }

        return age
    },
    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return `${day}-${month}-${year}`
    },
    grade: function(timestamp) {
        let grade = timestamp
        // console.log(grade) // Entrada do dado

        if (grade == '5EF') {
            grade = '1° Ano do Ensino Fundamental'
        } else if (grade == '6EF')
        // console.log(grade) // Saida do dado
        return grade
    }
}