function keyboardShortcuts(event: KeyboardEvent) {
    const key = event.key

    if (['n', 'c'].includes(key)) {
        event.preventDefault()
        addTodoItem()
    } else if (['x', 'q', 'Backspace'].includes(key)) {
        event.preventDefault()
        const todo_items = document.getElementById('todo-items')
        todo_items?.removeChild(todo_items.firstChild as ChildNode)
    } else if (['d', 'f', 'Enter'].includes(key)) {
        event.preventDefault()
        const todo_items = document.getElementById('todo-items')
        toggleTaskDone(todo_items?.firstChild as HTMLElement)
    } else if (['s', '`'].includes(key)) {
        event.preventDefault()
        toggleCompletedTasks()
    }
}

document.addEventListener('keydown', keyboardShortcuts)

function toggleTaskDone(target: HTMLElement) {
    target.classList.toggle('done')

    let todo_items = document.getElementById('todo-items')
    let hidden_items = document.getElementById('hidden-items')

    if (target.classList.contains('done')) {
        hidden_items.prepend(target)
    } else {
        todo_items.prepend(target)
    }

    let completed_button = document.getElementById('show-completed-tasks')

    if (hidden_items.children.length > 0) {
        completed_button.classList.add('show')
    } else {
        completed_button.classList.remove('show')
    }
}

function handleDoubleClick(event: MouseEvent) {
    let target = event.target as HTMLInputElement

    target.contentEditable = (target.contentEditable === 'false').toString()

    target.classList.toggle('hovereffect')

    target.focus()
}

function handleFocusOut(event: Event) {
    event.preventDefault()
    event.stopPropagation() // prevent overlap with global keyboard shortcut that marks the task as done
    let target = event.target as HTMLInputElement

    target.contentEditable = 'false'
    target.classList.add('hovereffect')

    document.addEventListener('keydown', keyboardShortcuts)
}

function addTodoItem() {
    let todo_items = document.getElementById('todo-items')

    let todo_item = document.createElement('div')
    todo_item.className = 'todo-item'

    let doneButton = document.createElement('button')
    doneButton.type = 'button'
    doneButton.className = 'done-button'
    doneButton.addEventListener('click', (event) => {
        const target = event.target as HTMLElement
        toggleTaskDone(target.parentElement as HTMLElement)
    })

    todo_item.appendChild(doneButton)

    let todo_textbox = document.createElement('div')
    todo_textbox.className = 'todo-textbox'
    todo_textbox.contentEditable = 'true'

    todo_textbox.addEventListener('dblclick', handleDoubleClick)
    todo_textbox.addEventListener('focusout', handleFocusOut)
    todo_textbox.addEventListener('focusin', () => {
        document.removeEventListener('keydown', keyboardShortcuts)
    })
    todo_textbox.addEventListener('keydown', (event) => {
        const key = event.key

        if (key === 'Enter' || key === 'Escape') {
            event.preventDefault()
            handleFocusOut(event)
        }
    })

    todo_item.appendChild(todo_textbox)

    let delete_button = document.createElement('button')
    delete_button.type = 'button'
    delete_button.className = 'delete-button'

    delete_button.addEventListener('click', (event) => {
        const target = event.target as HTMLInputElement
        target.parentElement?.remove()
    })

    todo_item.appendChild(delete_button)

    todo_items?.prepend(todo_item)

    todo_textbox.focus()
}

function toggleCompletedTasks() {
    let completed_button = document.getElementById('show-completed-tasks')
    completed_button.classList.toggle('alt')

    let hidden_items = document.getElementById('hidden-items')
    hidden_items.classList.toggle('show')
}
