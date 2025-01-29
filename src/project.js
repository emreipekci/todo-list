import { displayProjects } from "./dom.js";

//PROJECTS
//Project factory function
function createProject(title, description, checked=false) {
    return {
        title,
        description,
        checked
    };
}

// Function to Add New Project
function addNewProject(e, projectList) {
    e.preventDefault(); // Prevent form submission refresh

    // Get project title and description from form
    const title = document.getElementById("project-title").value;
    const description = document.getElementById("project-description").value;

    // Create a new project
    const newProject = createProject(title, description);

    // Add the project to the list
    projectList.push(newProject);

    // Update the project display
    displayProjects(projectList);
}

export { addNewProject };