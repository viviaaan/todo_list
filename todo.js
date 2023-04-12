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
function handleDoubleClick(event) {
    var target = event.target;
    // if (target.contentEditable === 'true') {
    //   clearSelection()
    // }
    // console.log(event)
    target.contentEditable = (target.contentEditable === 'false').toString();
    // if (target.contentEditable === 'true') {
    //   const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    //   let x = event.clientX
    //   let y = event.clientY
    //   click(x, y)
    // }
    if (target.contentEditable === 'true') {
        target.classList.remove('hovereffect');
    }
    else {
        target.classList.add('hovereffect');
    }
    target.focus();
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
    var todo_textbox = document.createElement('div');
    todo_textbox.className = 'todo-textbox';
    todo_textbox.contentEditable = 'true';
    todo_textbox.style.userSelect = 'none';
    var timer;
    todo_textbox.addEventListener('click', function (event) {
        if (event.detail === 1) {
            timer = setTimeout(function () {
                var _a;
                var target = event.target;
                target.style.textDecoration = target.style.textDecoration === 'none' ? 'line-through #808080 solid 2px' : 'none';
                target.style.color = target.style.color === 'white' ? 'rgba(255, 255, 255, 0.7)' : 'white';
                target.parentElement.style.opacity = ((_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.style.opacity) === '1' ? '0.5' : '1';
            }, 300);
        }
    });
    todo_textbox.addEventListener('dblclick', function (event) {
        clearTimeout(timer);
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
