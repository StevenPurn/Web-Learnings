const form = document.querySelector('form')
form.addEventListener('submit', submitForm)
document.body.addEventListener('change', changeCheckbox)
document.body.addEventListener('click', toggleItemVisibility)

function submitForm(event) {
    event.preventDefault()
    const input = form.querySelector('input')
    const toDoItem = document.querySelector('#toDoItem')
    if (input.value.trim().length > 0) {
        toDoItem.content.querySelector('.toDoText').innerText = input.value
        document.body.insertBefore(document.importNode(toDoItem.content, true), document.querySelector('.filters'))
    }
    input.value = null
}

function changeCheckbox(event) {
    if (event.target.matches('input[type="checkbox"]')) {
        event.target.parentElement.className = event.target.checked ? 'completed' : 'incomplete'
    }
}

function toggleItemVisibility(event) {
    if (event.target.matches('button')) {
        if (event.target.innerText === 'X') {
            event.target.parentElement.parentElement.remove()
            return
        }
        showElementsOfAllClasses()
        console.log(event.target.innerText)
        if (event.target.innerText === 'Completed') {
            toggleElementsOfClass('incomplete', false)
        } else if (event.target.innerText === 'Incomplete') {
            toggleElementsOfClass('completed', false)
        }
    }
}

function showElementsOfAllClasses() {
    toggleElementsOfClass('completed', true)
    toggleElementsOfClass('incomplete', true)
}

function toggleElementsOfClass(className, toggleOn) {
    const displayType = toggleOn ? 'block' : 'none'
    var divs = document.body.getElementsByClassName(className)
    if (divs.length <= 0) {
        return
    }
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = displayType
    }
}