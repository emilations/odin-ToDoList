// CREATE THE HTML FOR THE PROJECT ENTRY --------------------------------------
let htmlCreator = (function () {
  let project = function (index) {
    let projectEntry = document.createElement("div");
    projectEntry.classList.add("project-entry", "project-data");
    projectEntry.setAttribute("data-counter", index);

    let projectName = document.createElement("div");
    projectName.textContent = `New project ${index+1}`;
    projectName.classList.add("project-name");
    projectName.setAttribute("data-counter", index);

    let deleteIcon = document.createElement("img");
    deleteIcon.src = "/assets/icons8-trash-96-nonactive.svg";
    deleteIcon.alt = "delete Icon";

    projectEntry.appendChild(projectName);
    projectEntry.appendChild(deleteIcon);

    return projectEntry;
  };

// CREATE THE HTML FOR THE TASK ENTRY -----------------------------------------
  let task = function (index) {
    let taskEntry = document.createElement("div");
    taskEntry.classList.add("task-entry", "task-data");
    taskEntry.setAttribute("data-counter", index);

    let checkmarkIcon = document.createElement("img");
    checkmarkIcon.src = "./assets/icons8-checkmark_unchecked-96.png";
    checkmarkIcon.alt = "delete Icon";
    

    let taskName = document.createElement("div");
    taskName.textContent = `New task ${index+1}`;
    taskName.classList.add("project-name");
    taskName.setAttribute("data-counter", index);

    let deleteIcon = document.createElement("img");
    deleteIcon.setAttribute("id", "deleteTask")
    deleteIcon.setAttribute("data-counter", index)
    deleteIcon.src = "./assets/icons8-trash-96-nonactive.svg";
    deleteIcon.alt = "delete Icon";

    taskEntry.appendChild(checkmarkIcon);
    taskEntry.appendChild(taskName);
    taskEntry.appendChild(deleteIcon);

    return taskEntry;
  };

  return {
    project,
    task,
  };
})();

export { htmlCreator };
