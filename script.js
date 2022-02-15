document.addEventListener("DOMContentLoaded", () => {
  todo();
});

function todo(){
  const formTodo = document.getElementById('todo1')
  const newTaskName = document.querySelector('.todo-form__new-task-name')// имя новой задачи
  const taskList = document.querySelector('.todo')// список заданий  
  const taskDB = [] // ключ - название таска, значение - name input

  const createNewTask = (index, value, checked) => {
    const getNewTask = document.createElement('li')
    getNewTask.classList = 'todo__item'
    const getTaskCheck = document.createElement('input')
    getTaskCheck.classList ="task-check"
    getTaskCheck.name = `task-name_${index}`
    getTaskCheck.type = 'checkbox'
    getTaskCheck.checked = checked
    getTaskCheck.addEventListener('click', checkTaskStatus)

    const getTaskValue = document.createElement('span')
    getTaskValue.innerText = value
    getNewTask.append(getTaskCheck)
    getNewTask.append(getTaskValue)

    return getNewTask;
  }

  const addNewTask  = (newTaskIndex, newTaskValue, checked) => {
    return taskList.append(createNewTask(newTaskIndex, newTaskValue, checked))
  }

  const saveStateTask = (index, value, checked) => {
    return taskDB.push({
      index: index,
      [newTaskName.name] : value,
      checked: checked
    })
  }

  const checkTaskStatus = (event) => {
      const target = event.target
      const taskInfo = target.closest('.todo__item');// li-шка
      if(!taskInfo.contains(taskInfo.querySelector('.task-check'))) return;
      if(target !== taskInfo.querySelector('.task-check')) return;
      const taskIndex = target.name.split('_')[1]// получили индекс такса
      taskDB[Number(taskIndex) - 1].checked = target.checked;
      saveLocalStorage(taskIndex)
      console.log(taskDB)
  }

  const saveLocalStorage = (newTaskIndex) => {
    localStorage.setItem(String(newTaskIndex), JSON.stringify(taskDB[newTaskIndex - 1]))
  }

  (function loadFromLocalStorage () {
    const getLocalStorageInfo = Object.values(localStorage)
    getLocalStorageInfo.map( (e)=> {
      const index = JSON.parse(e).index
      const value = JSON.parse(e).input
      const checked  = JSON.parse(e).checked

      saveStateTask(index, value, checked)
      createNewTask(index, value, checked)
      addNewTask(index, value, checked)
    });
  }())
  
  formTodo.addEventListener('submit', (event) => {
    const newTaskValue = newTaskName.value
    const newTaskIndex = taskDB.length + 1;
    event.preventDefault();
    addNewTask(newTaskIndex, newTaskValue, false, saveStateTask(newTaskIndex, newTaskValue, false ))
    saveLocalStorage(newTaskIndex)
    
  })
}