document.addEventListener("DOMContentLoaded", () => {
  todo();
});

function todo(){
  const addNewTaskBtn = document.querySelector('.todo-form__button')// кнопка добавления новой задачи
  const newTaskName = document.querySelector('.todo-form__new-task-name')// имя новой задачи
  const taskList = document.querySelector('.todo')// список заданий
  const taskDB = [] // ключ - название таска, значение - name input

  const createNewTask = () => {
    if(newTaskName.value) { 
      const taskWrapper = document.createElement('div')
      taskWrapper.classList = 'todo__wrapper';

      const taskCheck = document.createElement('input')
      taskCheck.type = 'checkbox'
      taskCheck.classList = 'task-ckeck'
      taskCheck.name = ''

      const newTask = document.createElement('li');
      newTask.classList = 'todo__item';
      newTask.innerText = newTaskName.value;
      
      taskList.append(taskWrapper)
      taskWrapper.append(taskCheck)
      taskWrapper.append(newTask)
    }
  }
  
  addNewTaskBtn.addEventListener('click', () => {
    createNewTask()
    taskDB.push({[newTaskName.value] : newTaskName.name})
  })
}