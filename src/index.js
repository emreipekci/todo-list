import "./styles.css";
import { addNewTask } from "./task.js";
import { addNewProject } from "./project.js";
import { displayTasks, displayProjects } from "./dom.js";

const toDoList = [];
const projectList = [];

//Event listeners for adding tasks and projects
document.getElementById("task-form").addEventListener("submit", (e) => {
    addNewTask(e, toDoList);
    displayTasks(toDoList);
});



document.getElementById("project-form").addEventListener("submit", (e) => {
    addNewProject(e, projectList);
    displayProjects(projectList);
});


//Work here!
const addProjectButton = document.getElementsByClassName("add-project-button");
addProjectButton.addEventListener("click", () => {
    addNewProject();
});