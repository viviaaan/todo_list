function handleDoubleClick(event) {
    var target = event.target;
    target.contentEditable = (target.contentEditable === 'false').toString();
    if (target.contentEditable === 'true') {
        target.classList.remove('hovereffect');
    }
    else {
        target.classList.add('hovereffect');
    }
    target.focus();
}
function toggleTaskDone(event) {
    var _a, _b;
    var target = event.target;
    var todo_textbox = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.children[1];
    todo_textbox.style.textDecoration = todo_textbox.style.textDecoration === 'none' ? 'line-through #ffffff solid 1px' : 'none';
    todo_textbox.style.color = todo_textbox.style.color === 'white' ? 'rgba(255, 255, 255, 0.7)' : 'white';
    if (target.parentElement) {
        target.parentElement.style.opacity = ((_b = target.parentElement) === null || _b === void 0 ? void 0 : _b.style.opacity) === '1' ? '0.5' : '1';
    }
}
function handleFocusOut(event) {
    var target = event.target;
    target.contentEditable = 'false';
    target.classList.add('hovereffect');
}
function addTodoItem() {
    var todo_items = document.getElementById('todo-items');
    var todo_item = document.createElement('div');
    todo_item.className = 'todo-item';
    todo_item.style.opacity = '1';
    var doneButton = document.createElement('button');
    doneButton.type = 'button';
    doneButton.textContent = '✔';
    doneButton.className = 'done-button';
    doneButton.addEventListener('click', function (event) {
        toggleTaskDone(event);
    });
    todo_item.appendChild(doneButton);
    var todo_textbox = document.createElement('div');
    todo_textbox.className = 'todo-textbox';
    todo_textbox.contentEditable = 'true';
    todo_textbox.style.userSelect = 'none';
    todo_textbox.style.textDecoration = 'none';
    todo_textbox.style.color = 'white';
    todo_textbox.addEventListener('dblclick', function (event) {
        handleDoubleClick(event);
    });
    todo_textbox.addEventListener('focusout', function (event) {
        handleFocusOut(event);
    });
    todo_textbox.addEventListener('keydown', function (event) {
        var key = event.key;
        if (key === 'Enter' || key === 'Escape') {
            event.preventDefault();
            handleFocusOut(event);
        }
    });
    todo_item.appendChild(todo_textbox);
    var delete_button = document.createElement('button');
    delete_button.type = 'button';
    delete_button.className = 'delete-button';
    delete_button.innerHTML = 'X';
    delete_button.addEventListener('click', function (event) {
        var _a;
        var target = event.target;
        (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
    });
    todo_item.appendChild(delete_button);
    todo_items === null || todo_items === void 0 ? void 0 : todo_items.prepend(todo_item);
    todo_textbox.focus();
}
