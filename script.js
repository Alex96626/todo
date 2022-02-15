document.addEventListener("DOMContentLoaded", () => {
  todo();
});

function todo(){
  const formTodo = document.getElementById('todo1')
  const newTaskName = document.querySelector('.todo-form__new-task-name')// имя новой задачи
  const taskList = document.querySelector('.todo')// список заданий  
  const taskDB = [] // ключ - название таска, значение - name input

  const createNewTask = (index, value) => {
    const getNewTask = document.createElement('li')
    getNewTask.classList = 'todo__item'
    const getTaskCheck = document.createElement('input')

    getTaskCheck.classList = "task-check"
    getTaskCheck.name = `task-name_${index}`
    getTaskCheck.type = 'checkbox'
    getTaskCheck.addEventListener('click', checkTaskStatus)

    const getTaskValue = document.createElement('span')
    getTaskValue.innerText = value
    getNewTask.append(getTaskCheck)
    getNewTask.append(getTaskValue)

    return getNewTask;
  }

  const addNewTask  = (newTaskIndex, newTaskValue, ) => {
    return taskList.append(createNewTask(newTaskIndex, newTaskValue))
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
      console.log(taskDB)
  }

  const saveLocalStorage = (newTaskIndex) => {
    localStorage.setItem(String(newTaskIndex), JSON.stringify(taskDB[newTaskIndex - 1]))
  }

  (function loadFromLocalStorage () {
    const getLocalStorageInfo = Object.entries(localStorage)
    getLocalStorageInfo.map( (e)=> {
      const index = JSON.parse(e[0])
      const value = JSON.parse(e[1]).input
      const checked  = JSON.parse(e[1]).checked

      saveStateTask(index, value, checked)
      createNewTask(index, index)
      addNewTask(index, value)
    });
  }())
  
  formTodo.addEventListener('submit', (event) => {
    const newTaskValue = newTaskName.value
    const newTaskIndex = taskDB.length + 1;
    event.preventDefault();
    addNewTask(newTaskIndex, newTaskValue, saveStateTask(newTaskIndex, newTaskValue, false ))
    saveLocalStorage(newTaskIndex)
    
  })
}