const dateInput = document.querySelector("#date")
const selectedDate = new Date(dateInput.value)
const todoInput = document.querySelector("#todo-input")
const span = document.querySelector("#span1")


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
    addRow(todoInput.value)
  }
})

function formatDate(date) {
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const dateStr = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${dateStr}`
}

function addRow(content) {
  const div = document.createElement('div');

  div.className = 'row';

  div.innerHTML = `
  <li class="todo">
    <input type="checkbox" value="Something" class="checkbox">
    <div class="content">${content}</div>
    <span class="span">❌</span>
    </li>
  `;

  document.querySelector("#todos").appendChild(div);

  const todos = document.querySelectorAll(".todo")

  for (  let i = 0; i < todos.length; i++) {
    addCheckboxEventListener(todos[i])
    addSpanEventListener(todos[i])
  }

  function addCheckboxEventListener(todo) {
    todo.querySelector(".checkbox").addEventListener('change', function () {
      if (this.checked) {
        todo.querySelector(".content").style.textDecoration = "line-through"
      } else {
        todo.querySelector(".content").style.textDecoration = "none"
      }
    })
  }

  function addSpanEventListener(todo) {
    todo.querySelector(".span").addEventListener('click', function () {
      todo.innerHTML = ""
    })
  }
}
