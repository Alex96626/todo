document.addEventListener("DOMContentLoaded", () => {
  const addNewTask = document.querySelector('.todo-form__button')// кнопка добавления новой задачи
  const newTaskName = document.querySelector('.todo-form__new-task-name')// имя новой задачи
  const taskList = document.querySelector('.todo')// список заданий

  const createNewNask = ()=>{
    if(newTaskName.value){ 
      const newTask = document.createElement('li');
        newTask.classList = 'todo__item';
        newTask.innerText = newTaskName.value;
      taskList.append(newTask)
    }
  }
  
  addNewTask.addEventListener('click', ()=>{
    createNewNask()
  })

});