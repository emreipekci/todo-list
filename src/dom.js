import { showTaskForm } from "./task.js";

const toDoList = [];
const projectList = [];

//function to display tasks
function displayTasks(toDoList) {
    const taskDisplay = document.getElementById("task-display");
    taskDisplay.innerHTML = ""; //clear existing tasks

    toDoList.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `<h3>${task.title}</h3>
                                <p>${task.details}</p>
                                <p>Due: ${task.date} | Priority: ${task.priority}</p>
                                <p>Project: ${task.project}</p>
                                <input type="checkbox" ${task.checked ? "checked" : ""}>`;
        
        taskDisplay.appendChild(taskElement);  
    });
}

// Function to Display Projects
function displayProjects(projectList, toDoList) {
    const projectDisplay = document.getElementById("project-display");
    projectDisplay.innerHTML = ""; // Clear previous projects

    projectList.forEach((project, index) => {
        const projectElement = document.createElement("div");
        projectElement.textContent = project.title; //Show only title
        projectElement.classList.add("project-title");

        // Click event to show details
        projectElement.addEventListener("click", () => {
            console.log("Clicked project:", project.title);
            showProjectPreview(project, index, projectList, toDoList);
        });
        
        projectDisplay.appendChild(projectElement);
    });
}

// Show project details
function showProjectPreview(project, index, projectList, toDoList) {
    console.log("Showing preview for:", project.title);
    
    const previewContainer = document.getElementById("content-preview");

    const titleElement = document.createElement("h3");
    titleElement.textContent = project.title;

    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Add Task";
    addTaskButton.classList.add("add-task-button");

    // Filter tasks by selected project
    const filteredTasks = toDoList.filter(task => task.project === project.title);
    displayTasks(filteredTasks);

    // Append elements to the details section
    previewContainer.appendChild(titleElement);
    previewContainer.appendChild(addTaskButton);

    console.log("Added Add Task Button:", addTaskButton); 
}



export { displayTasks, displayProjects, showProjectPreview };