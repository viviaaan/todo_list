// function clearSelection() {
//   let range = document.createRange()
//   range.collapse(true)
//   if (window.getSelection) {
//     if (window.getSelection()?.empty) {  // Chrome
//       window.getSelection()?.empty();
//     } else if (window.getSelection()?.removeAllRanges) {  // Firefox
//       window.getSelection()?.removeAllRanges();
//     }
//   }
//   window.getSelection()?.addRange(range)
// }

// function click(x,y){
//     var ev = document.createEvent("MouseEvent");
//     var el = document.elementFromPoint(x,y);
//     ev.initMouseEvent(
//         "click",
//         true /* bubble */, true /* cancelable */,
//         window, null,
//         x, y, 0, 0, /* coordinates */
//         false, false, false, false, /* modifier keys */
//         0 /*left*/, null
//     );
//     console.log(el.dispatchEvent(ev))
// }

function handleDoubleClick(event: MouseEvent) {
    let target = event.target as HTMLInputElement

    // if (target.contentEditable === 'true') {
    //   clearSelection()
    // }
    // console.log(event)
    target.contentEditable = (target.contentEditable === 'false').toString()

    // if (target.contentEditable === 'true') {
    //   const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    //   let x = event.clientX
    //   let y = event.clientY
    //   click(x, y)
    // }

    if (target.contentEditable === 'true') {
      target.classList.remove('hovereffect')
    } else {
      target.classList.add('hovereffect')
    }

    target.focus()
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

  let todo_textbox = document.createElement('div')
  todo_textbox.className = 'todo-textbox'
  todo_textbox.contentEditable = 'true'
  todo_textbox.style.userSelect = 'none'

  let timer
  todo_textbox.addEventListener('click', (event: MouseEvent) => {
    if (event.detail === 1) {
      timer = setTimeout(() => {
      let target = event.target as HTMLInputElement

      target.style.textDecoration = target.style.textDecoration === 'none' ? 'line-through #808080 solid 2px' : 'none'
      target.style.color = target.style.color === 'white' ? 'rgba(255, 255, 255, 0.7)' : 'white'
      target.parentElement.style.opacity = target.parentElement?.style.opacity === '1' ? '0.5' : '1'
      }, 300)
    }
  })

  todo_textbox.addEventListener('dblclick', (event: MouseEvent) => {
    clearTimeout(timer)
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
