const todoInput = document.querySelector('.todo-input')
const todoSaveButton = document.querySelector('.todo-save-button')

const fetchTodos = async () => {
    try {
        const response = await fetch('/read')
        const todolist = await response.json()

        const todolistDiv = document.querySelector('.todolist')

        if (todolist.length === 0) {
            todolistDiv.innerHTML = 'your todolist is empty'
        } else {
            let collections = ''

            for (const todo of todolist) {
                collections += `<div class="row m-auto g-2" data-id="${todo._id}">
                    <div class="col-9 border-bottom border-secondary border-1">
                        ${todo.text}
                    </div>
                    <div class="col bg-secondary text-white d-flex justify-content-center p-1">
                        <i class="fa fa-pencil-square-o edit m-1"></i>
                        <i class="fa fa-trash-o remove m-1"></i>
                    </div>
                </div>`
            }

            todolistDiv.innerHTML = collections
        }
    } catch (error) {
        alertAndReloadWindow(error)
    }
}

const addEventOnIcons = () => {
    const editIcons = document.querySelectorAll('.edit')
    const removeIcons = document.querySelectorAll('.remove')

    for (const editIcon of editIcons) {
        editIcon.addEventListener('click', editIconEventCallback)
    }

    for (const removeIcon of removeIcons) {
        removeIcon.addEventListener('click', removeIconEventCallback)
    }
}

const alertBoxCallback = (result) => {
    const alertBox = document.querySelector('.alert-box')
    const { status, message, doc } = result
    let div = ''

    if (status === 200) {
        div = `<div class='alert alert-success' role="alert">${
            doc.text || ''
        }  ${message}</div>`
    } else {
        div = `<div class='alert alert-danger' role="alert">${message}</div>`
    }

    alertBox.innerHTML = div

    setTimeout(() => {
        alertBox.innerHTML = ''
    }, 1500)
}

const createEventCallback = async () => {
    try {
        const text = todoInput.value

        const response = await fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ text }),
        })

        const result = await response.json()

        await fetchTodos()
        addEventOnIcons()
        alertBoxCallback(result)

        todoInput.value = ''
    } catch (error) {
        alertBoxCallback(error)
    }
}

todoSaveButton.addEventListener('click', createEventCallback)

const editIconEventCallback = async function () {
    try {
        const parent = this.parentNode.parentNode
        const id = parent.dataset.id
        const text = parent.firstElementChild.innerText
        const newText = prompt('edit:', text)

        if (newText === '' || newText === null || newText === text) {
            throw Error('Invalid input! Field Cannot be Updated')
        }

        const response = await fetch(`/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ text: newText }),
        })

        const result = await response.json()

        await fetchTodos()
        addEventOnIcons()
        alertBoxCallback(result)
    } catch (error) {
        alertBoxCallback({ status: 500, message: error })
    }
}

const removeIconEventCallback = async function () {
    try {
        const parent = this.parentNode.parentNode
        const id = parent.dataset.id

        const response = await fetch(`/delete/${id}`, {
            method: 'DELETE',
        })
        const result = await response.json()

        await fetchTodos()
        addEventOnIcons()
        alertBoxCallback(result)
    } catch (error) {
        alertBoxCallback(error)
    }
}

/**
 *
 * fetch todos and add event in icons
 */
const callback = async () => {
    try {
        await fetchTodos()
        addEventOnIcons()
    } catch (error) {
        alertBoxCallback(error)
    }
}
callback()
