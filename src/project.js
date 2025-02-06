import { displayProjects } from "./dom.js";

//PROJECTS
//Project factory function
function createProject(title, checked=false) {
    return {
        title,
        checked
    };
}

const projectForm = document.getElementById("project-form");
const addProjectButton = document.querySelector(".add-project-button");
const addButton = document.getElementById("add-button");
const cancelButton = document.getElementById("cancel-button");

// Initially hide the project form
projectForm.classList.add("hidden"); 

// Open the project form
addProjectButton.addEventListener("click", () => {
    projectForm.classList.toggle("hidden");
    addProjectButton.style.display = "none";   // Hide the button when form is open
    
});

// ADD NEW PROJECT
function addNewProject(e, projectList, toDoList) {
    e.preventDefault(); // Prevent form submission refresh

    // Get project title from form
    const title = document.getElementById("project-title").value;
    if (!title.trim()) return; // Prevent empty projects

    const newProject = { title };
    projectList.push(newProject);
    
    console.log("New project added:", newProject);
    console.log("Updated project list:", projectList);
    displayProjects(projectList, toDoList);  // Update the project display


    projectForm.reset();
    projectForm.classList.add("hidden"); // Hide form after adding project
    addProjectButton.style.display = "block"; // Show "Add Project" button again
}

// Cancel button hides the form and brings back "Add Project" button
cancelButton.addEventListener("click", () => {
    projectForm.reset();
    projectForm.classList.add("hidden"); 
    addProjectButton.style.display = "block";    
});

export { addNewProject };
