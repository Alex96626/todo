document.addEventListener("DOMContentLoaded", () => {
  todo();
  
});

function todo(){
  const formTodo = document.getElementById('todo1')
  const newTaskName = document.querySelector('.todo-form__new-task-name')// имя новой задачи
  const taskList = document.querySelector('.todo')// список заданий  const taskDB = [] // ключ - название таска, значение - name input
  const taskDB = [] // ключ - название таска, значение - name input
  const createNewTask = (index, {title}) => {
    return `<li class="todo__item"> 
            <input  class="task-ckeck" name="task-name_${index}"type="checkbox">
            <span>${title}</span>
            </li>`
  }

  const addNewTask  = () => {
    return taskList.insertAdjacentHTML('beforeend', (createNewTask(taskDB.length + 1, {title: newTaskName.value})) )
  }

  const saveStateTask = () => {
    return taskDB.push({
      index: taskDB.length + 1,
      [newTaskName.name] : newTaskName.value,
      checked: false
    })
  }

  const checkTaskStatus = () => {
    taskList.addEventListener('click', (event)=> {
      const taskInfo = event.target.closest('.todo__item');// li-шка
      if(!taskInfo.contains(taskInfo.querySelector('.task-ckeck'))) return;
      if(event.target !== taskInfo.querySelector('.task-ckeck')) return;
        const tastIndex = event.target.name.split('_').splice(1, 1).join()// получили интек такса
        taskDB.forEach((e)=> {
          if(e.index = tastIndex) {
            event.target.checked ? e.checked = true : e.checked = false // смена состояния "выполено"
          }
        })
    })
  }
  
  formTodo.addEventListener('submit', () => {
    event.preventDefault();
    addNewTask()
    saveStateTask()
    checkTaskStatus()
  })

  
}