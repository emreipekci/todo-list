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
const taskProjectInput = document.getElementById("task-project");
taskForm.classList.add('hidden')


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

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-task-button")) {
            console.log("Add Task Button Clicked!");
            taskForm.classList.remove("hidden"); 
        }
    });



// Function to show task form when adding a task to a project
function showTaskForm(projectName) {
    taskForm.classList.remove("hidden");  // Show the task form
    taskProjectInput.value = projectName || ""; // Pre-fill the project name in the form
    console.log("Task form shown for project:", projectName);
}





export { addNewTask, showTaskForm };