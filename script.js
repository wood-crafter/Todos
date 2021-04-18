const dateInput = document.querySelector("#date")
const selectedDate = new Date(dateInput.value)
const todoInput = document.querySelector("#todo-input")


document.querySelector("#prev").addEventListener("click", function () {
  selectedDate.setDate(selectedDate.getDate() - 1)

  dateInput.value = formatDate(selectedDate)
})

document.querySelector("#next").addEventListener("click", function () {
  selectedDate.setDate(selectedDate.getDate() + 1)

  dateInput.value = formatDate(selectedDate)
})

document.querySelector("#add").addEventListener("click", function () {
  if(todoInput.value){
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
  <li>
  <input type="checkbox" value="Something">
  <div>${content}</div>
  <span>❌</span>
  </li>
  `;

  document.querySelector("#todos").appendChild(div);
}
