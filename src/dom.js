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
function displayProjects(projectList) {
    const projectDisplay = document.getElementById("project-display");
    projectDisplay.innerHTML = ""; // Clear previous projects

    projectList.forEach(project => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <input type="checkbox" ${project.checked ? "checked" : ""}>
        `;
        projectDisplay.appendChild(projectElement);
    });
}

export { displayTasks, displayProjects };