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
  <li id="li1">
  <input type="checkbox" value="Something" id="checkbox1">
  <div id="content1">${content}</div>
  <span id="span1">❌</span>
  </li>
  `;

  document.querySelector("#todos").appendChild(div);

  document.querySelector("#checkbox1").addEventListener('change', function () {
    if (this.checked) {
      document.querySelector("#content1").innerHTML = "Ok!"
    } else {
      document.querySelector("#content1").innerHTML = "Not Ok!"
    }
  })

  document.querySelector("#span1").addEventListener('click', function () {
    console.log("")
    document.querySelector("#li1").innerHTML = ""
  })
}
