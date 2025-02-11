import "./styles.css";
import { addNewTask } from "./task.js";
import { addNewProject } from "./project.js";
import { displayProjects, displayTasks } from "./dom.js";
import { loadFromLocalStorage } from "./storage.js";

const toDoList = [];
const projectList = [];

//Event listeners for adding tasks and projects
document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage(toDoList, projectList);
    displayProjects(projectList, toDoList);
    displayTasks(toDoList);
});

document.getElementById("task-form").addEventListener("submit", (e) => {
    addNewTask(e, toDoList, projectList);
    displayTasks(toDoList);
});

document.getElementById("project-form").addEventListener("submit", (e) => {
    addNewProject(e, projectList, toDoList);
    displayProjects(projectList);   
});
    
export { toDoList, projectList }; 

/* Clear localStorage and reset the app's state
function clearLocalStorage() {
    // Remove data from localStorage
    localStorage.removeItem("toDoList");
    localStorage.removeItem("projectList");

    // Reset in-memory arrays
    toDoList = [];
    projectList = [];

    // Optionally, clear the display or call functions to show empty state
    displayTasks(toDoList);
    displayProjects(projectList);
}

document.addEventListener("DOMContentLoaded", () => {
    clearLocalStorage();  // Clears data when the page loads
}); */
