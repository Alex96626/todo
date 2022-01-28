document.addEventListener("DOMContentLoaded", () => {
  todo();
});

function todo(){
  const parser = new DOMParser();
  const formTodo = document.getElementById('todo1')
  const newTaskName = document.querySelector('.todo-form__new-task-name')// имя новой задачи
  const taskList = document.querySelector('.todo')// список заданий
  const taskDB = [] // ключ - название таска, значение - name input

  const createNewTask = () => {
    return `<li class=" todo__item"> <input  class="task-ckeck" type ="checkbox"> <span>${newTaskName.value}</span> </li>`
  }

  const addNewTsk  = () => {
    // return parser.parseFromString(createNewTask(), "text/html")
    return taskList.insertAdjacentHTML('beforeend',createNewTask() )
  }

  const saveStateTask = () => {
    return taskDB.push({
      [newTaskName.name] : newTaskName.value,
      checked: false
    })
  }
  
  formTodo.addEventListener('submit', () => {
    event.preventDefault();
    addNewTsk()
    saveStateTask()
  })
}