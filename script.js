const dateInput = document.querySelector("#date")
const selectedDate = new Date(dateInput.value)
const todoInput = document.querySelector("#todo-input")
const span = document.querySelector("#span1")
let todoId = 1
let todos = []
const storedTodos = JSON.parse(localStorage.getItem('todos'))
if (storedTodos !== null) {
  for (let i = 0; i < storedTodos.length; i++) {
    todos.push(storedTodos[i])
    if (todos[i].id > todoId) {
      todoId = todos[i] + 1
    }
  }
}

addAllTodos()



document.querySelector("#prev").addEventListener("click", function () {
  selectedDate.setDate(selectedDate.getDate() - 1)

  dateInput.value = formatDate(selectedDate)
})

document.querySelector("#next").addEventListener("click", function () {
  selectedDate.setDate(selectedDate.getDate() + 1)

  dateInput.value = formatDate(selectedDate)
})

document.querySelector("#add").addEventListener("click", function () {
  if (todoInput.value) {
    const nextTodo = { id: todoId, dateCreate: new Date(dateInput.value), content: todoInput.value, isDone: false }
    todoId += 1

    todos.push(nextTodo)

    //sort todos by dateCreate
    if (todos.length > 1) {
      todos.sort((thisTodo, nextTodo) => {
        return thisTodo.dateCreate - nextTodo.dateCreate;
      });
    }
    //stringify todos
    const todosJSON = JSON.stringify(todos)
    localStorage.setItem('todos', todosJSON)
    removeAllRecord()

    addAllTodos()
  }
})

function removeTodo(id) {
  //remove not available records
  todos = todos.filter((todo) => {
    return todo.id != id
  })
}

function removeAllRecord() {
  while (document.querySelector("#todos").firstChild) {
    document.querySelector("#todos").firstChild.remove()
  }
}

function addAllTodos() {
  //Add not done todos
  for (let i = 0; i < todos.length; i++) {
    if (!todos[i].isDone) {
      addRow(todos[i])
    }
  }
  //Add done todos
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].isDone) {
      addRow(todos[i])
    }
  }
}

function formatDate(date) {
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const dateStr = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${dateStr}`
}

function addRow(todo) {
  const div = document.createElement('div');

  div.className = 'row';

  if (todo.isDone) {
    div.innerHTML = `
    <li class="todo">
      <input type="checkbox" value="Something" class="checkbox" checked>
      <div class="content">${todo.content}</div>
      <span class="span">❌</span>
    </li>
  `
  } else {
    div.innerHTML = `
    <li class="todo">
      <input type="checkbox" value="Something" class="checkbox">
      <div class="content">${todo.content}</div>
      <span class="span">❌</span>
    </li>
  `
  }

  document.querySelector("#todos").appendChild(div);

  if (todo.isDone) {
    div.querySelector(".content").style.textDecoration = "line-through"
  } else {
    div.querySelector(".content").style.textDecoration = "none"
  }

  addCheckboxEventListener(div, todo)
  addSpanEventListener(div, todo)

  function addCheckboxEventListener(div, todo) {
    div.querySelector(".checkbox").addEventListener('change', (e) => {
      if (e.target.checked) {
        todos.find((thisTodo) => {
          return thisTodo.id === todo.id
        }).isDone = true
        //stringify todos
        const todosJSON = JSON.stringify(todos)
        localStorage.setItem('todos', todosJSON)

        removeAllRecord()
        addAllTodos()
      } else {
        todos.find((thisTodo) => {
          return thisTodo.id === todo.id
        }).isDone = false

        //stringify todos
        const todosJSON = JSON.stringify(todos)
        localStorage.setItem('todos', todosJSON)

        removeAllRecord()
        addAllTodos()
      }
    })
  }

  function addSpanEventListener(div, todo) {
    div.querySelector(".span").addEventListener('click', (e) => {
      removeTodo(todos.find((thisTodo) => {
        return thisTodo.id === todo.id
      }).id)

      //stringify todos
      const todosJSON = JSON.stringify(todos)
      localStorage.setItem('todos', todosJSON)

      div.parentNode.removeChild(div)
    })
  }
}
