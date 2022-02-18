document.addEventListener("DOMContentLoaded", () => {
  todo();
});

function todo(){
  const formTodo = document.getElementById('todo1')
  const newTaskName = document.querySelector('.todo-form__new-task-name')// имя новой задачи
  const taskListOnBoard = document.querySelector('.todo')// список заданий  
  const taskDB = [] // ключ - название таска, значение - name input

  

  const createNewTask = ({index, value, checked}) => {

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

    return getNewTask // созданая НОД(li)
  }

  const appendTasks  = (taskList) => {
    taskListOnBoard.append(...taskList.map( (item) => {return createNewTask(item)}))
  }

  const saveStateTask = ({index, value, checked}) => {
    return taskDB.push({
      index: index,
      value : value,
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
  }

  const saveLocalStorage = () => {
    localStorage.setItem('taskList', JSON.stringify(taskDB))
  }

  const loadFromLocalStorage = () => {
    const getLocalStorageInfo = JSON.parse(localStorage.getItem('taskList'))

    if(getLocalStorageInfo){
    getLocalStorageInfo.forEach((e) => {
      
      const localStorageTaskInfo = {
        index : e.index,
        value : e.value, 
        checked : e.checked
      }
      saveStateTask(localStorageTaskInfo)
      
    })

      saveLocalStorage()
      appendTasks(taskDB)

    }
  }
  
  loadFromLocalStorage()
  
  formTodo.addEventListener('submit', (event) => {
    event.preventDefault()
    const taskInfo = {
      index : taskDB.length + 1,
      value : newTaskName.value,
      checked : false,
    }
    saveStateTask(taskInfo )
    appendTasks([taskInfo])

    saveLocalStorage()
    
  })
}