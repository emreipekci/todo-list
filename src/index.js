import "./styles.css";
import { addNewTask } from "./task.js";
import { addNewProject } from "./project.js";
import { displayProjects } from "./dom.js";

const toDoList = [];
const projectList = [];

//Event listeners for adding tasks and projects
document.addEventListener("DOMContentLoaded", () => {
    displayProjects(projectList); 
});

document.getElementById("task-form").addEventListener("submit", (e) => {
    addNewTask(e, toDoList);
});

document.getElementById("project-form").addEventListener("submit", (e) => {
    addNewProject(e, projectList, toDoList);   
});
    
export { toDoList, projectList }; 
