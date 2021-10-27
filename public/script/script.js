const todoForm = document.querySelector('.todo-form')

const fetchTodos = async () => {
    try {
        const response = await fetch('/read')
        const todolist = await response.json()

        const todolistDiv = document.querySelector('.todolist')

        if (todolist.length === 0) {
            todolistDiv.innerHTML =
                '<tr><th scope="row" colspan="3" class="bg-secondary">your todolist is empty</th></tr>'
        } else {
            let collections = ''

            for (let [index, todo] of Object.entries(todolist)) {
                collections += `<tr data-id="${todo._id}">
                    <th scope="row">${++index}</th>
                    <td>${todo.text}</td>
                    <td>
                        <i class="fa fa-pencil-square-o edit"></i>
                        <i class="fa fa-trash-o remove"></i>
                    </td>
                </tr>`
            }
            todolistDiv.innerHTML = collections
        }
    } catch (error) {
        alertBoxCallback(error)
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

const createEventCallback = async function (e) {
    try {
        e.preventDefault()
        // FILTER HTML TAGS
        const text = [...this.text.value]
            .map(function (e) {
                const obj = {
                    '<': '&lt;',
                    '>': '&gt;',
                }
                return obj[e] ? obj[e] : e
            })
            .join('')

        const response = await fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ text }),
        })

        const result = await response.json()
        const status = response.status

        await fetchTodos()
        addEventOnIcons()
        alertBoxCallback({ status, ...result })

        this.text.value = ''
    } catch (error) {
        alertBoxCallback(error)
    }
}

todoForm.addEventListener('submit', createEventCallback)

const editIconEventCallback = async function () {
    try {
        const parent = this.parentNode.parentNode
        const id = parent.dataset.id
        const text = parent.children[1].innerText
        let promptText = prompt('edit:', text)

        // FILTER HTML TAGS
        let newText = [...promptText]
            .map(function (e) {
                const obj = {
                    '<': '&lt;',
                    '>': '&gt;',
                }
                return obj[e] ? obj[e] : e
            })
            .join('')

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
        const status = response.status

        await fetchTodos()
        addEventOnIcons()
        alertBoxCallback({ status, ...result })
    } catch (error) {
        alertBoxCallback(error)
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
        const status = response.status

        await fetchTodos()
        addEventOnIcons()
        alertBoxCallback({ status, ...result })
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
