import { displayTasks } from "./dom.js";

//TASKS 
//Task factory function
function createTask(title, details, date, priority, project, checked=false) {
    return {
        title,
        details,
        date,
        priority,
        project,
        checked
    };
}

const taskForm = document.getElementById("task-form");
taskForm.style.display = "none"; // Initially hide the form

// Function to Add New Task
function addNewTask(e, toDoList) {
    
    e.preventDefault(); // stop page from refreshing after each submit

    // Get values from form inputs
    const title = document.getElementById("task-title").value;
    const details = document.getElementById("task-details").value;
    const date = document.getElementById("task-date").value;
    const priority = document.getElementById("task-priority").value;
    const project = document.getElementById("task-project").value;

    //Create a new task
    const newTask = createTask(title, details, date, priority, project);

    // Add the task to the toDoList array
    toDoList.push(newTask);

    // Update the display
    displayTasks(toDoList);
}

// Function to show task form when adding a task to a project
function showTaskForm(projectName) {
    const taskForm = document.getElementById("task-form");
    if (taskForm) {
        taskForm.classList.remove("hidden"); }

    // If project name is given, set it in the form
    document.getElementById("task-project").value = projectName || "";
}

export { addNewTask, showTaskForm };