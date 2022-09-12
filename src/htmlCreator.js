let htmlCreator = (function () {
  let project = function (projectTitle) {
    let projectEntry = document.createElement("div");
    projectEntry.classList.add("project-entry", "project-data");

    let projectName = document.createElement("div");
    projectName.textContent = projectTitle;
    projectName.classList.add("project-name");

    let deleteIcon = document.createElement("img");
    deleteIcon.src = "/assets/icons8-trash-96-nonactive.svg";
    deleteIcon.alt = "delete Icon";

    projectEntry.appendChild(projectName);
    projectEntry.appendChild(deleteIcon);
    return projectEntry;
  };

  let task = function () {
    let taskEntry = document.createElement("div");
    taskEntry.classList.add("task-entry");

    let checkmarkIcon = document.createElement("img");
    checkmarkIcon.src = "./assets/icons8-checkmark_unchecked-96.png";
    checkmarkIcon.alt = "delete Icon";

    let taskName = document.createElement("div");
    taskName.classList.add("project-name");

    let deleteIcon = document.createElement("img");
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
