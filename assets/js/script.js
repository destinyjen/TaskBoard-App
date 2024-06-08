// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// ? Helper function that displays the time, this is called every second in the setInterval function below.
function displayTime() {
  const rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  if (nextId === null) {
    nextId = 1;
  } else {
    nextId++;
  }
  JSON.stringify(localStorage.setItem("nextId", nextId));
  return nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // const article = $('<article>')
  // .addClass('card task-card draggable my-3 task-card')
  // .attr('data-task-id', task.id);

  const article = document.createElement("article");
  const taskTitleEl = document.createElement("h2");
  const taskDueDateEl = document.createElement("p");
  const taskDescriptionEl = document.createElement("p");
  const todoCards = document.getElementById("todo-cards");
  const deleteBtn = document.createElement("button");

  article.classList.add('card', 'task-card', 'draggable', 'my-3', 'task-card');

  article.dataset.taskid = task.id

  taskTitleEl.textContent = task.title;
  taskDueDateEl.textContent = task.dueDate;
  taskDescriptionEl.textContent = task.description;
  deleteBtn.textContent = "Delete";
  deleteBtn.dataset.taskid = task.id
  deleteBtn.addEventListener("click", handleDeleteTask)
  // article.appendChild(taskTitleEl);
  // article.appendChild(taskDueDateEl);
  // article.appendChild(taskDescriptionEl);
  article.append(taskTitleEl, taskDueDateEl, taskDescriptionEl, deleteBtn);
  // taskCard.append(taskTitleEl,todoCards);

  return article;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  for (let index = 0; index < taskList.length; index++) {
    const task = taskList[index];
    const taskCard = createTaskCard(task);
    // if the status is toDo put it in the toDo column
    if (task.status === "to-do") {
      document.getElementById("todo-cards").append(taskCard);
    }
    // if the status is inProgress put it in the inProgress column
    if (task.status === "in-progress"){
      document.getElementById("in-progress-cards").append(taskCard)
    }
    // if the status is done put it in the done column
    if (task.status === "done"){
      document.getElementById("done-cards").append(taskCard)
    }
  }
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });

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
    status: "to-do",
  };
  // Add it to the task list in local storage
  taskList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  //Render the taskList
  renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

  // console.log(event.target)
  // console.log(this)
    const deleteBtnId = $(this).attr("data-taskid")
    // console.log(deleteBtnId)

    taskList = taskList.filter((task) => task.id != deleteBtnId)
    // console.log(taskList)

    localStorage.setItem("tasks", JSON.stringify(taskList))

    renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  console.log(event);
  console.log(ui);

  const tasks = JSON.parse(localStorage.getItem("tasks"))

  const laneStatus = event.target.id
  const taskId = ui.draggable[0].dataset.taskid; 

  for (const task of taskList) {

    if (task.id == taskId) {
      task.status = laneStatus;
    }

  }
  localStorage.setItem("tasks", JSON.stringify(taskList))
  renderTaskList()
};
  // // update the status of the dropped task


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $("#task-due-date").datepicker();
    $("#save-changes").on("click", handleAddTask);
  $(".lane").droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
  // use mini project and documentation to configure dragging
  $(".task-card").draggable();
});
