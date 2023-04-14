function handleDoubleClick(event) {
    let target = event.target;
    target.contentEditable = (target.contentEditable === 'false').toString();
    if (target.contentEditable === 'true') {
        target.classList.remove('hovereffect');
    }
    else {
        target.classList.add('hovereffect');
    }
    target.focus();
}
function keyboardShortcuts(event) {
    const key = event.key;
    if (key === 'n' || key === 'c') {
        event.preventDefault();
        addTodoItem('beginning');
    }
    else if (key === 'N' || key === 'C') {
        event.preventDefault();
        addTodoItem('end');
    }
    else if (key === 'x' || key === 'q') {
        event.preventDefault();
        const todo_items = document.getElementById('todo-items');
        todo_items === null || todo_items === void 0 ? void 0 : todo_items.removeChild(todo_items.firstChild);
    }
    else if (key === 'X' || key === 'Q') {
        event.preventDefault();
        const todo_items = document.getElementById('todo-items');
        todo_items === null || todo_items === void 0 ? void 0 : todo_items.removeChild(todo_items.lastChild);
    }
    else if (key === 'd' || key === 'f') {
        event.preventDefault();
        const todo_items = document.getElementById('todo-items');
        toggleTaskDone(todo_items === null || todo_items === void 0 ? void 0 : todo_items.firstChild);
    }
}
function toggleTaskDone(target) {
    let todo_textbox = target.children[1];
    todo_textbox.style.textDecoration = todo_textbox.style.textDecoration === 'none' ? 'line-through #ffffff solid 1px' : 'none';
    todo_textbox.style.color = todo_textbox.style.color === 'white' ? 'rgba(255, 255, 255, 0.7)' : 'white';
    target.style.opacity = target.style.opacity === '1' ? '0.5' : '1';
}
function handleFocusOut(event) {
    let target = event.target;
    target.contentEditable = 'false';
    target.classList.add('hovereffect');
    document.addEventListener('keydown', keyboardShortcuts);
}
function addTodoItem(where = 'beginning') {
    let todo_items = document.getElementById('todo-items');
    let todo_item = document.createElement('div');
    todo_item.className = 'todo-item';
    todo_item.style.opacity = '1';
    let doneButton = document.createElement('button');
    doneButton.type = 'button';
    doneButton.className = 'done-button';
    doneButton.addEventListener('click', (event) => {
        const target = event.target;
        toggleTaskDone(target.parentElement);
    });
    todo_item.appendChild(doneButton);
    let todo_textbox = document.createElement('div');
    todo_textbox.className = 'todo-textbox';
    todo_textbox.contentEditable = 'true';
    todo_textbox.style.userSelect = 'none';
    todo_textbox.style.textDecoration = 'none';
    todo_textbox.style.color = 'white';
    todo_textbox.addEventListener('dblclick', handleDoubleClick);
    todo_textbox.addEventListener('focusout', handleFocusOut);
    todo_textbox.addEventListener('focusin', () => {
        document.removeEventListener('keydown', keyboardShortcuts);
    });
    todo_textbox.addEventListener('keydown', (event) => {
        const key = event.key;
        if (key === 'Enter' || key === 'Escape') {
            event.preventDefault();
            handleFocusOut(event);
        }
    });
    todo_item.appendChild(todo_textbox);
    let delete_button = document.createElement('button');
    delete_button.type = 'button';
    delete_button.className = 'delete-button';
    delete_button.addEventListener('click', (event) => {
        var _a;
        const target = event.target;
        (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    });
    todo_item.appendChild(delete_button);
    if (where === 'end') {
        todo_items === null || todo_items === void 0 ? void 0 : todo_items.append(todo_item);
    }
    else {
        todo_items === null || todo_items === void 0 ? void 0 : todo_items.prepend(todo_item);
    }
    todo_textbox.focus();
}
document.addEventListener('keydown', keyboardShortcuts);
