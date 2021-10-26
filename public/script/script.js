const todoInput = document.querySelector('.todo-input')
const todoSaveButton = document.querySelector('.todo-save-button')

const createEventCallback = async () => {
    try {
        const text = todoInput.value

        await fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ text }),
        })

        window.location.reload(true)
    } catch (error) {
        console.log(error)
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
            await fetch(`/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ text: newText }),
            })
            window.location.reload(true)
        }
    } catch (error) {
        console.log(error)
    }
}

const removeIconEventCallback = async function () {
    try {
        const parent = this.parentNode.parentNode
        const id = parent.dataset.id

        await fetch(`/delete/${id}`, {
            method: 'DELETE',
        })

        window.location.reload(true)
    } catch (error) {
        console.log(error)
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
