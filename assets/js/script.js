// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    console.log(task);
   const taskTitleEl = document.createElement("h2");
   const taskDueDateEl = document.createElement("p");
   const taskDescriptionEl = document.createElement("p");

   taskTitleEl.textContent = task.title
   taskDueDateEl.textContent = task.dueDate
   taskDescriptionEl.textContent = task.description
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    // Get all the form fields, form fields should be added locally
    const taskTitle = document.getElementById("task-title");
    const taskDuedate = document.getElementById("task-due-date");
    const taskDescription = document.getElementById("task-description");
    const newTask = {
        title: taskTitle.value,
        dueDate: taskDuedate.value,
        description: taskDescription.value,
    };
    // Add it to the task list in local storage
    taskList.push(newTask)
    localStorage.setItem("tasks", JSON.stringify(taskList))
    // Create the tasks with create taskcard
    createTaskCard(newTask)
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $( "#task-due-date" ).datepicker();
    document.querySelector("#save-changes").addEventListener("click", handleAddTask)
});