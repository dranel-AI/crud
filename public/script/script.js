const todoInput = document.querySelector('.todo-input')
const todoSaveButton = document.querySelector('.todo-save-button')

const alertBoxCallback = (result) => {
    const alertBox = document.querySelector('.alert-box')
    const { status, message, doc } = result

    if (status === 200) {
        div = `<div class='alert alert-success' role="alert">${
            doc.text || ''
        }  ${message}</div>`
    } else {
        div = `<div class='alert alert-success' role="alert">${message}'</div>`
    }

    alertBox.innerHTML = div
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
        alertBoxCallback(result)

        setTimeout(() => {
            window.location.reload(true)
        }, 1500)
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

        if (newText !== '' && newText !== null && newText !== text) {
            const response = await fetch(`/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ text: newText }),
            })
            const result = await response.json()
            alertBoxCallback(result)

            setTimeout(() => {
                window.location.reload(true)
            }, 1500)
        }
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
        alertBoxCallback(result)

        setTimeout(() => {
            window.location.reload(true)
        }, 1500)
        console.log(result)
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

addEventOnIcons()
