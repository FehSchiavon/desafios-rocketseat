const currentPage = location.pathname
const menuItems = document.querySelectorAll(".content header a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href")) ) {
        item.classList.add('active')
    }
}