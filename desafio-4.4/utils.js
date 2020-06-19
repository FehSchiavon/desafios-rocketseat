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
    graduation: function(timestamp) {
        const graduation = timestamp.graduation
        
        console.log(graduation)
        
    }
}