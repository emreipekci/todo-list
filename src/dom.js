import { showTaskForm } from "./task.js";
import { projectList, toDoList } from "./index.js";
import { saveToLocalStorage } from "./storage.js";


//✅ DISPLAY TASKS
function displayTasks(toDoList) {
    const taskDisplay = document.getElementById("task-display");

    taskDisplay.querySelectorAll(".task").forEach(task => task.remove());

    toDoList.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.checked) {
            taskElement.classList.add("completed"); // Add completed style if checked
        }
        taskElement.innerHTML = `<h3>${task.title}</h3>
                                <p>${task.details}</p>
                                <p>Due: ${task.date} | Priority: ${task.priority}</p>
                                <p>${task.project}</p>
                                <input type="checkbox" ${task.checked ? "checked" : ""}>`;
        
        // Add event listener to update the task status when checkbox is clicked
        const checkbox = taskElement.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", () => {
            task.checked = checkbox.checked; // Update `toDoList` directly
            saveToLocalStorage(toDoList, projectList); // Save updated state
            displayTasks(toDoList, projectList); // Re-render the task list
        });
        
        taskDisplay.appendChild(taskElement);  
    });
}

// ✅ FILTER TASKS
function filterTasks(toDoList, filterType) {
    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekDate = nextWeek.toISOString().split("T")[0];

    let filteredTasks = [];

    if (filterType === "all") {
        filteredTasks = toDoList; // Show all tasks
    } else if (filterType === "today") {
        filteredTasks = toDoList.filter(task => task.date === today);
    } else if (filterType === "week") {
        filteredTasks = toDoList.filter(task => task.date >= today && task.date <= nextWeekDate);
    }
    // Clear the project title when filtering tasks
    const previewContainer = document.getElementById("content-preview");
    const titleElement = previewContainer.querySelector(".title-element");
    if (titleElement) {
        titleElement.textContent = ""; // Clear the project title
    }

    displayTasks(filteredTasks);
    document.getElementById("task-form").classList.add('hidden');
    document.querySelector(".add-task-button").style.display = "none";
    // Re-enable clicks on projects and tasks
    document.querySelector(".project-list").classList.remove("disabled");
    document.getElementById("task-display").classList.remove("disabled");
}

// ✅ Event listeners for sidebar buttons
document.getElementById("all-tasks-btn").addEventListener("click", () => {
    console.log("All tasks button clicked");
    filterTasks(toDoList, "all");
});
document.getElementById("today-tasks-btn").addEventListener("click", () => {
    console.log("Today tasks button clicked");
    filterTasks(toDoList, "today");
});
    
document.getElementById("week-tasks-btn").addEventListener("click", () => {
    console.log("Week tasks button clicked");
    filterTasks(toDoList, "week"); 
});
    

//✅ DISPLAY PROJECTS
function displayProjects(projectList, toDoList) {
    const projectDisplay = document.getElementById("project-display");
    projectDisplay.innerHTML = ""; // Clear previous projects

    projectList.forEach((project, index) => {
        const projectElement = document.createElement("div");
        projectElement.textContent = project.title; //Show only title
        projectElement.classList.add("project-title");

        // Click event to show details
        projectElement.addEventListener("click", () => {
            showProjectPreview(project, toDoList);
        });
        
        projectDisplay.appendChild(projectElement);
    });
}

//✅ SHOW PROJECT PREVIEW
function showProjectPreview(project, toDoList) {  
    const previewContainer = document.getElementById("content-preview");
    const taskDisplay = document.getElementById("task-display");

    // Check if titleElement already exists
    let titleElement = previewContainer.querySelector(".title-element");
    if (!titleElement) {
        titleElement = document.createElement("h3");
        titleElement.classList.add("title-element");
        previewContainer.appendChild(titleElement);
    }
    titleElement.textContent = project.title; // Update title
    
    // Remove only the add-task-button
    const oldButton = previewContainer.querySelector(".add-task-button");
    if (oldButton) oldButton.remove();

    taskDisplay.innerHTML = "";

    const addTaskButton = document.createElement("button");
    addTaskButton.textContent = "Add Task";
    addTaskButton.classList.add("add-task-button");

    // Filter tasks by selected project
    const filteredTasks = toDoList.filter(task => task.project === project.title);
    displayTasks(filteredTasks);

    // Append elements to the details section
    previewContainer.appendChild(titleElement);
    previewContainer.appendChild(taskDisplay);
    previewContainer.appendChild(addTaskButton);

    // Event listener for add task button
    addTaskButton.addEventListener("click", () => {
        showTaskForm(project.title);
    });
}

export { displayTasks, displayProjects };
