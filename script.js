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
      const target = event.target
      const taskInfo = target.closest('.todo__item');// li-шка
      if(!taskInfo.contains(taskInfo.querySelector('.task-ckeck'))) return;
      if(target !== taskInfo.querySelector('.task-ckeck')) return;
      const tastIndex = target.name.split('_')[1]// получили индекс такса
      taskDB[Number(tastIndex) - 1].checked = target.checked;
    })
  }
  
  formTodo.addEventListener('submit', (event) => {
    event.preventDefault();
    addNewTask()
    saveStateTask()
    checkTaskStatus()
  })
}