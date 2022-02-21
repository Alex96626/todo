document.addEventListener("DOMContentLoaded", () => {
  todo();
});

function todo(){
  const formTodo = document.getElementById('todo1')
  const newTaskName = document.querySelector('.todo-form__new-task-name')// имя новой задачи
  const taskListOnBoard = document.querySelector('.todo')// список заданий  
  const tasksList = JSON.parse(localStorage.getItem('taskList')) ?? []/// ключ - название таска, значение - name input

  const createNewTask = ({index, value, checked}) => {

    const getNewTask = document.createElement('li')
    getNewTask.classList = 'todo__item'
    const getTaskCheck = document.createElement('input')
    
    getTaskCheck.classList ="task-check"
    getTaskCheck.name = `task-name_${index}`
    getTaskCheck.type = 'checkbox'
    getTaskCheck.checked = checked
    getTaskCheck.addEventListener('click', switchTaskStatus)

    const getTaskValue = document.createElement('span')
    getTaskValue.innerText = value
    getNewTask.append(getTaskCheck)
    getNewTask.append(getTaskValue)

    return getNewTask // созданая НОД(li)
  }

  const appendTasks  = (taskList) => {
    taskListOnBoard.append(...taskList.map( createNewTask ))
  }

  const addTaskInList = ({index, value, checked}) => {
    tasksList.push ({
      index: index,
      value : value,
      checked: checked
    })
  }

  const switchTaskStatus = (event) => {
    const target = event.target
    const taskIndex = target.name.split('_')[1]// получили индекс такса
    
    tasksList[Number(taskIndex) - 1].checked = target.checked;
    
    setToLocalStorage(taskIndex)
  }

  const setToLocalStorage = () => {
    localStorage.setItem('taskList', JSON.stringify(tasksList))
  }

  const showTasksFromLocalStorage = () => {

    appendTasks(tasksList)
    
  }
  
  showTasksFromLocalStorage()
  
  formTodo.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const taskInfo = {
      index : tasksList.length + 1,
      value : newTaskName.value,
      checked : false,
    }

    addTaskInList(taskInfo )
    appendTasks([taskInfo])
    setToLocalStorage()
    
  })
}