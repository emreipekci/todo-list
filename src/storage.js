function saveToLocalStorage(toDoList, projectList) {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    localStorage.setItem("projectList", JSON.stringify(projectList));
}

function loadFromLocalStorage(toDoList, projectList) {
    const storedTasks = JSON.parse(localStorage.getItem("toDoList")) || [];
    const storedProjects = JSON.parse(localStorage.getItem("projectList")) || [];

    toDoList.length = 0; // Clear and repopulate
    toDoList.push(...storedTasks);

    projectList.length = 0;
    projectList.push(...storedProjects);
}

export { saveToLocalStorage, loadFromLocalStorage };


