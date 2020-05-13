const modalOverlay = document.querySelector('.modal-overlay')
const courses = document.querySelectorAll('.courses')

for (let course of courses) {
    course.addEventListener('click', function(){
        const nameCourse = course.getAttribute('id')
        window.location.href = `/course/${nameCourse}`
    })
}