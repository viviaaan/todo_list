function handleDoubleClick(event: MouseEvent) {
  let target = event.target as HTMLInputElement

  target.contentEditable = (target.contentEditable === 'false').toString()

  if (target.contentEditable === 'true') {
    target.classList.remove('hovereffect')
  } else {
    target.classList.add('hovereffect')
  }

  target.focus()
}

function toggleTaskDone(event: MouseEvent) {
  let target = event.target as HTMLInputElement
  let todo_textbox = target.parentElement?.children[1] as HTMLInputElement

  todo_textbox.style.textDecoration = todo_textbox.style.textDecoration === 'none' ? 'line-through #ffffff solid 1px' : 'none'
  todo_textbox.style.color = todo_textbox.style.color === 'white' ? 'rgba(255, 255, 255, 0.7)' : 'white'
  if (target.parentElement) {
    target.parentElement.style.opacity = target.parentElement?.style.opacity === '1' ? '0.5' : '1'
  }
}

function handleFocusOut(event: Event) {
  let target = event.target as HTMLInputElement

  target.contentEditable = 'false'
  target.classList.add('hovereffect')
}

function addTodoItem() {
  let todo_items = document.getElementById('todo-items')

  let todo_item = document.createElement('div')
  todo_item.className = 'todo-item'
  todo_item.style.opacity = '1'

  let doneButton = document.createElement('button')
  doneButton.type = 'button'
  doneButton.textContent = '✔'
  doneButton.className = 'done-button'
  doneButton.addEventListener('click', (event: MouseEvent) => {
    toggleTaskDone(event)
  })

  todo_item.appendChild(doneButton)

  let todo_textbox = document.createElement('div')
  todo_textbox.className = 'todo-textbox'
  todo_textbox.contentEditable = 'true'
  todo_textbox.style.userSelect = 'none'


  todo_textbox.style.textDecoration = 'none'
  todo_textbox.style.color = 'white'

  todo_textbox.addEventListener('dblclick', (event: MouseEvent) => {
    handleDoubleClick(event)
  })

  todo_textbox.addEventListener('focusout', (event) => {
    handleFocusOut(event)
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
  delete_button.innerHTML = 'X'

  delete_button.addEventListener('click', (event) => {
    const target = event.target as HTMLInputElement

    target.parentElement?.remove()
  })

  todo_item.appendChild(delete_button)

  todo_items?.prepend(todo_item)
  todo_textbox.focus()
}
