const modalOverlay = document.querySelector('.modal-overlay')
const courses = document.querySelectorAll('.courses')

for (let course of courses) {
    course.addEventListener('click', function(){
        const webCourse = course.getAttribute('id')
        modalOverlay.classList.add('active')
        modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${webCourse}`
    })
}

document.querySelector('.close-modal').addEventListener('click', function () {
    modalOverlay.classList.remove('active')
    modalOverlay.querySelector('iframe').src = ""
})