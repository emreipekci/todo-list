import { displayTasks } from "./dom.js";
import { saveToLocalStorage } from "./storage.js";

//TASKS 
//✅Task factory function
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
taskForm.classList.add('hidden');

//✅ ADD NEW TASK
function addNewTask(e, toDoList, projectList) {
    
    e.preventDefault(); // stop page from refreshing after each submit

    // Get values from form inputs
    const title = document.getElementById("task-title").value.trim();
    const details = document.getElementById("task-details").value.trim();
    const date = document.getElementById("task-date").value;
    const priority = document.getElementById("task-priority").value;
   
    // Retrieve project name from the dataset
    const project = taskForm.dataset.projectName;  

    if (!title || !project) return; // Prevent adding a task without a title or project

    //Create a new task
    const newTask = { title, details, date, priority, project, checked: false };

    // Add the task to the toDoList array
    toDoList.push(newTask);
    saveToLocalStorage(toDoList, projectList);  // Save updated list
    
    taskForm.reset();

    displayTasks(toDoList.filter(task => task.project === project));
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-task-button")) {
        taskForm.classList.remove("hidden");
        document.querySelector(".add-task-button").style.display = "none";    
        }
    }); 

//✅ SHOW TASK FORM when adding a task to a project
function showTaskForm(projectName) {
    const taskForm = document.getElementById("task-form");
    taskForm.classList.remove("hidden"); // Show the task form

    // Store project name somewhere accessible (e.g., hidden input or dataset)
    taskForm.dataset.projectName = projectName;

    const previewContainer = document.getElementById("content-preview");
    const titleElement = previewContainer.querySelector(".title-element");
    if (titleElement) {
        titleElement.insertAdjacentElement("afterend", taskForm); // Ensure form appears AFTER title
    } else {
        previewContainer.prepend(taskForm); // If no title (unlikely), just add the form at the top
    }

    // Disable clicks on projects and tasks
    document.querySelector(".project-list").classList.add("disabled");
    document.getElementById("task-display").classList.add("disabled");
}

// Cancel button hides the task form and brings back "Add Task" button
const taskCancelButton = document.getElementById("task-cancel-button");
taskCancelButton.addEventListener("click", () => {
    taskForm.reset();
    taskForm.classList.add("hidden"); 
    document.querySelector(".add-task-button").style.display = "block";  
    
    // Re-enable clicks on projects and tasks
    document.querySelector(".project-list").classList.remove("disabled");
    document.getElementById("task-display").classList.remove("disabled");
});

export { addNewTask, showTaskForm, createTask };