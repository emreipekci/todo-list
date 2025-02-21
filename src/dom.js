import { showTaskForm } from "./task.js";
import { projectList, toDoList } from "./index.js";
import { saveToLocalStorage } from "./storage.js";

const previewContainer = document.getElementById("content-preview");
const taskDisplay = document.getElementById("task-display");
const addTaskButton = document.querySelector(".add-task-button");

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
                                <label>Completed: <input type="checkbox" ${task.checked ? "checked" : ""}></label>
                                <i class="fa fa-trash delete-task" title="Delete"></i>`;
        
        // Add event listener to update the task status when checkbox is clicked
        const checkbox = taskElement.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", () => {
            task.checked = checkbox.checked; // Update `toDoList` directly
            saveToLocalStorage(toDoList, projectList); // Save updated state
            displayTasks(toDoList, projectList); // Re-render the task list
        });

        // DELETE BUTTON
        const deleteButton = taskElement.querySelector(".delete-task");
        deleteButton.addEventListener("click", () => {
        toDoList.splice(index, 1);  // Remove task from array
        saveToLocalStorage(toDoList, projectList); // Save new list
        displayTasks(toDoList);  // Refresh tasks
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

    // ✅ Select task display container and clear previous content
    const taskDisplay = document.getElementById("task-display");
    taskDisplay.innerHTML = ""; 

    // ✅ Remove existing "no tasks" message before adding a new one
    const existingMessage = document.querySelector(".no-tasks-message");
    if (existingMessage) existingMessage.remove();

    if (filteredTasks.length === 0) {
        // ✅ Show message when no tasks match the filter
        const noTasksMessage = document.createElement("p");
        noTasksMessage.textContent = "Yay! There are no tasks!";
        noTasksMessage.classList.add("no-tasks-message"); // Optional: Add a class for styling
        taskDisplay.appendChild(noTasksMessage);
    } else {
        displayTasks(filteredTasks);
    }

    document.getElementById("task-form").classList.add('hidden');

     // ✅ Only hide the add-task-button if it exists
    addTaskButton.style.display = "none";
    if (addTaskButton) {
        addTaskButton.style.display = "none";
    }
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
    console.log("toDoList:", toDoList);
    filterTasks(toDoList, "week"); 
});
    

//✅ DISPLAY PROJECTS
function displayProjects(projectList, toDoList) {
    const projectDisplay = document.getElementById("project-display");
    projectDisplay.innerHTML = ""; // Clear previous projects

    projectList.forEach((project, index) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project-container");

        const projectTitle = document.createElement("span");
        projectTitle.textContent = project.title;
        projectTitle.classList.add("project-title");

        // ✅ Create delete button with trash bin icon
        const deleteButton = document.createElement("i");
        deleteButton.classList.add("fa", "fa-trash", "delete-project");
        deleteButton.setAttribute("title", "Delete Project"); // Tooltip on hover

         // Click event to show project details
        projectTitle.addEventListener("click", () => {
            const taskForm = document.getElementById("task-form");
            if (taskForm && previewContainer.contains(taskForm)) {
                taskForm.classList.add("hidden");
            }
            showProjectPreview(project, toDoList);
        });

        // Click event to delete project
        deleteButton.addEventListener("click", () => {
            deleteProject(project.title);
        });

        // Append elements
        projectElement.appendChild(projectTitle);
        projectElement.appendChild(deleteButton);
        projectDisplay.appendChild(projectElement);
        
    });
}

//✅ DELETE PROJECT FUNCTION
function deleteProject(projectTitle) {
    // Remove from project list
    const updatedProjects = projectList.filter(project => project.title !== projectTitle);
    projectList.length = 0; // Clear original array
    projectList.push(...updatedProjects); // Update with new data

    // Remove associated tasks
    const updatedTasks = toDoList.filter(task => task.project !== projectTitle);
    toDoList.length = 0; 
    toDoList.push(...updatedTasks);

    // Save updated lists to local storage
    saveToLocalStorage(toDoList, projectList);

    // Re-render the UI
    displayProjects(projectList, toDoList);
    displayTasks(toDoList);
    previewContainer.querySelector(".title-element").style.display = "none";
    addTaskButton.style.display = "none";
}

//✅ SHOW PROJECT PREVIEW
function showProjectPreview(project, toDoList) {  
    if (!toDoList) toDoList = []; // Ensure it's an array

    // Check if titleElement already exists
    let titleElement = previewContainer.querySelector(".title-element");
    if (!titleElement) {
        titleElement = document.createElement("h3");
        titleElement.classList.add("title-element");
        previewContainer.appendChild(titleElement);
    }
    titleElement.textContent = project.title; // Update title
    
    addTaskButton.style.display = "block";

    // Remove "No tasks" message if it exists
    const existingMessage = document.querySelector(".no-tasks-message");
    if (existingMessage) existingMessage.remove();

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
