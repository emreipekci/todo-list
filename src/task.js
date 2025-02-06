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

taskForm.classList.add('hidden')


// ADD NEW TASK
function addNewTask(e, toDoList) {
    
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

    console.log(`Task added to project: ${project}`, newTask);

    // ✅ Display tasks for the selected project
    const filteredTasks = toDoList.filter(task => task.project === project);
    displayTasks(filteredTasks);
}

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-task-button")) {
            console.log("Add Task Button Clicked!");
            taskForm.classList.remove("hidden");

            document.querySelector(".add-task-button").style.display = "none";
            document.querySelector(".title-element").style.display = "none";
            
        }
    }); 

// Function to show task form when adding a task to a project
function showTaskForm(projectName) {
    const taskForm = document.getElementById("task-form");
    taskForm.classList.remove("hidden"); // Show the task form


        // Store project name somewhere accessible (e.g., hidden input or dataset)
        taskForm.dataset.projectName = projectName;

// ✅ Disable clicks on projects and tasks
document.querySelector(".project-list").classList.add("disabled");
document.getElementById("task-display").classList.add("disabled");
     

    console.log("Task form shown for project:", projectName);
}

// Cancel button hides the task form and brings back "Add Task" button
const taskCancelButton = document.getElementById("task-cancel-button");
taskCancelButton.addEventListener("click", () => {
    taskForm.reset();
    taskForm.classList.add("hidden"); 
    document.querySelector(".add-task-button").style.display = "block"; 
    document.querySelector(".title-element").style.display = "block"; 
    
     // ✅ Re-enable clicks on projects and tasks
     document.querySelector(".project-list").classList.remove("disabled");
     document.getElementById("task-display").classList.remove("disabled");
});





export { addNewTask, showTaskForm };