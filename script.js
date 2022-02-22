document.addEventListener("DOMContentLoaded", () => {
  todo();
});

function todo(){
  const formTodo = document.getElementById('todo1')
  const newTaskName = document.querySelector('.todo-form__new-task-name')// имя новой задачи
  const newTaskDescription = document.querySelector('.todo-form__task-description')
  const taskListOnBoard = document.querySelector('.todo')// список заданий  
  const tasksList = JSON.parse(localStorage.getItem('taskList')) ?? []/// ключ - название таска, значение - name input
  

  const createNewTask = ({index, value, checked, description, date}) => {

    const getNewTask = document.createElement('li')
    getNewTask.classList = 'todo__item'
    getNewTask.setAttribute('data-task-number', index)

    const getTaskCheck = document.createElement('input')
    getTaskCheck.classList ="task-check"
    getTaskCheck.name = `task-name_${index}`
    getTaskCheck.type = 'checkbox'
    getTaskCheck.checked = checked
    getTaskCheck.addEventListener('click', switchTaskAnyValue)

    const getTaskValue = document.createElement('span')
    getTaskValue.innerText = value

    const getTaskDescription = document.createElement('p')
    getTaskDescription.classList = 'task-description'
    getTaskDescription.innerText = description ?? ''

    const getTaskDate = document.createElement('p')
    getTaskDate.classList = 'task-date'
    // const nowDay = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
    // const nowMonth = new Date().getMonth() < 10 ? '0' + new Date().getMonth() : new Date().getMonth()
    // const nowYear = new Date().getFullYear()
    getTaskDate.innerText = date
    getNewTask.append(getTaskCheck)
    getNewTask.append(getTaskValue)
    getNewTask.append(getTaskDescription)
    getNewTask.append(getTaskDate)


    return getNewTask // созданая НОД(li)
  }

  const appendTasks  = (taskList) => {
    taskListOnBoard.append(...taskList.map( createNewTask ))
  }

  const addTaskInList = ({index, value, checked, description, date}) => {
    tasksList.push ({
      index: index,
      value : value,
      description : description,
      checked: checked,
      date:date,
    })
  }

  const switchTaskAnyValue = (event) => {
    const target = event.target
    const taskIndex = target.closest('.todo__item').dataset.taskNumber// получили индекс такса

    if (target.classList. contains('task-check')) {
      tasksList[Number(taskIndex) - 1].checked = target.checked;
    }
  
    setToLocalStorage()
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
    const nowDay = new Date().getDate()
    const nowMonth = new Date().getMonth()
    const nowYear = new Date().getFullYear()
    const taskInfo = {
      index : tasksList.length + 1,
      value : newTaskName.value,
      description : newTaskDescription.value,
      checked : false,
      date : (nowDay < 10 ? '0' + nowDay : nowDay) + '.' + (nowMonth < 10 ? '0' + nowMonth : nowMonth) + '.' + (nowYear),
    }


    addTaskInList(taskInfo )
    appendTasks([taskInfo])
    setToLocalStorage()
    
  })
}
