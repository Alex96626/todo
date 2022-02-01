document.addEventListener("DOMContentLoaded", () => {
  todo();
  
});

function todo(){
  const formTodo = document.getElementById('todo1')
  const newTaskName = document.querySelector('.todo-form__new-task-name')// имя новой задачи
  const taskList = document.querySelector('.todo')// список заданий
  const taskDB = [] // ключ - название таска, значение - name input

  const createNewTask = (taskDB, taskInfo) => {
    return `<li class="todo__item"> 
            <input  class="task-ckeck" name="task-name_${taskDB.length} "type="checkbox">
            <span>${taskInfo.title}</span>
            </li>`
  }

  const addNewTask  = () => {
    return taskList.insertAdjacentHTML('beforeend', (createNewTask(taskDB, {})) )
  }

  const saveStateTask = () => {
    return taskDB.push({
      [newTaskName.name] : newTaskName.value,
      checked: false
    })
  }

  const checkTaskStatus = () => {
    taskList.addEventListener('click', (event)=> {
      const taskInfo = event.target.closest('.todo__item');// li-шка
      if(!taskInfo.contains(taskInfo.querySelector('.task-ckeck'))) return;
      if(event.target !== taskInfo.querySelector('.task-ckeck')) return;
        console.log(event.target)
    })
  }
  
  formTodo.addEventListener('submit', () => {
    event.preventDefault();
    addNewTask()
    saveStateTask()
    checkTaskStatus()
  })

  
}