// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  //think of drivers licenses and DMV visits, what if you have the same DOB of others? How does the state identify you. They need a reference point that has all your items
  //what if two taks have the same title, due date, and description; how else are we identifying the task?  
  // check if nextId exists(if it has a number) 
    // if it does we can add 1
    // if it doesn't we can make it 1
    // lastly, put it in localStorage and return it
    if (nextId === null) {
      nextId = 1;
    }
    else {
      nextId++;
    }
    JSON.stringify(localStorage.setItem("nextId", nextId))
    return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {

  const article = document.createElement("article");
  const taskTitleEl = document.createElement("h2");
  const taskDueDateEl = document.createElement("p");
  const taskDescriptionEl = document.createElement("p");
  const todoCards = document.getElementById("todo-cards");

  article.classList.add("task-card");

  taskTitleEl.textContent = task.title;
  taskDueDateEl.textContent = task.dueDate;
  taskDescriptionEl.textContent = task.description;

  article.appendChild(taskTitleEl);
  article.appendChild(taskDueDateEl);
  article.appendChild(taskDescriptionEl);

return article;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  for (let index = 0; index < taskList.length; index++) {
    const task = taskList[index];
    const taskCard = createTaskCard(task);
    // if the status is toDo put it in the toDo column
    if (task.status === "toDo"){
      document.getElementById("todo-cards").appendChild(taskCard)
    }
    // if the status is inProgress put it in the inProgress column
    if (task.status === "inProgress"){
      document.getElementById("in-progress-cards").appendChild(taskCard)
    }
    // if the status is done put it in the done column
    if (task.status === "done"){
      document.getElementById("done-cards").appendChild(taskCard)
    }
  }

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  // Get all the form fields, form fields should be added locally
  const taskTitle = document.getElementById("task-title");
  const taskDuedate = document.getElementById("task-due-date");
  const taskDescription = document.getElementById("task-description");
  const taskId = generateTaskId();
  const newTask = {
    id: taskId,
    title: taskTitle.value,
    dueDate: taskDuedate.value,
    description: taskDescription.value,
    status: "toDo",
  };
  // Add it to the task list in local storage
  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
//Render the taskList
renderTaskList();

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  console.log(event)
  console.log(ui)
  //update the status of the dropped task
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $("#task-due-date").datepicker();
  document
    .querySelector("#save-changes")
    .addEventListener("click", handleAddTask);
    $( ".lane" ).droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
    // use mini project and documentation to configure dragging
    $(".task-card").draggable();
});
