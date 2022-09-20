import { htmlCreator } from "./htmlCreator";
import { control } from "./logic";

let display = (function () {
  let projectAddButton;
  let taskAddButton;
  let projectContainer;
  let taskContainer;
  let selectedProject = 0;
  let selectedTask = 0;

  function cacheDOM() {
    projectAddButton = document.querySelector(".project-add");
    taskAddButton = document.querySelector(".task-add");
    projectContainer = document.querySelector("#project-selector");
    taskContainer = document.querySelector("#task-selector");
  }

  function buttonListener() {
    projectAddButton.addEventListener("click", createProject);
    taskAddButton.addEventListener("click", createTask);
  }

  function populateProjects() {
    projectContainer.innerHTML = "";
    let projectList = control.getProjects();
    projectList.forEach((elem, index) => {
      projectContainer.appendChild(
        htmlCreator.project(index, elem.project.title)
      );
    });
    let active = document.querySelectorAll(".project-data")[selectedProject];
    if (!active) {
      return;
    }
    active.classList.add("project-entry-active");
    active.childNodes[1].src = "./assets/icons8-edit-96-active.png";
    active.childNodes[2].src = "./assets/icons8-trash-96-active.svg";
  }

  function populateTasks() {
    taskContainer.innerHTML = "";
    if (control.getProjects().length == 0) {
      selectedProject = 0;
      return;
    }
    let taskList = control.getProjects()[selectedProject].project.tasks;
    taskList.forEach((elem, index) => {
      let entry = htmlCreator.task(index, elem.title, elem.dueDate);
      if (elem.done) {
        entry.classList.add("task-completed")
        entry.childNodes[0].src = "./assets/icons8-checkmark_checked-96.png";
        entry.childNodes[3].src = "./assets/icons8-edit-96.png";
        entry.childNodes[4].src = "./assets/icons8-trash-96-nonactive.svg";
      }
      taskContainer.appendChild(entry);
    });
    let active = document.querySelectorAll(".task-data")[selectedTask];
    if (!active) {return}
    active.classList.add("task-entry-active");
  }

  function createProject(e) {
    control.createProject();
    refresh();
  }

  function createTask(e) {
    control.createTask(selectedProject);
    refresh();
  }

  function listenProject() {
    let projects = document.querySelectorAll(".project-data");
    projects.forEach((elem) =>
      elem.addEventListener("click", function (e) {
        if (e.target.id == "deleteProject") {
          deleteProject(e.target.dataset.counter);
        } else if (e.target.id == "editProject") {
          projectActive(e.target.dataset.counter);
          listenProjectTitleMod(e);
        } else {
          projectActive(e.target.dataset.counter);
        }
      })
    );
  }

  function listenTask() {
    let tasks = document.querySelectorAll(".task-data");
    tasks.forEach((elem) =>
      elem.addEventListener("click", function (e) {
        if (e.target.id == "deleteTask") {
          deleteTask(e.target.dataset.counter);
        } else if (e.target.id == "editTask") {
          taskActive(e.target.dataset.counter);
          listenTaskMod(e);
        } else if (e.target.id == "task-complete") {
          taskActive(e.target.dataset.counter);
          taskComplete(e);
          refresh();
        } else if (e.target.id == "task-date") {  
          taskActive(e.target.dataset.counter);
          listenTaskMod(e);
        } else {
          taskActive(e.target.dataset.counter);
        }
      })
    );
  }

  function taskActive(counter) {
    selectedTask = counter;
    refresh();
  }

  function projectActive(counter) {
    selectedProject = counter;
    refresh();
  }

  function deleteTask(taskCounter) {
    let newSize = control.deleteTask(taskCounter, selectedProject) - 1;
    console.log(newSize);
    if (selectedTask > newSize) {
      selectedTask = selectedTask - 1;
    }
    refresh();
  }

  function deleteProject(counter) {
    let newSize = control.deleteProject(counter) - 1;
    if (selectedProject > newSize) {
      selectedProject = selectedProject - 1;
    }
    refresh();
  }

  function listenTaskMod(e) {
    let index = e.target.dataset.counter;
    let taskEntry = document.querySelector(`.task-entry[data-counter="${index}"]`);
    let taskName = taskEntry.childNodes[1].textContent;
    let taskDate = taskEntry.childNodes[2].textContent;
    let input = htmlCreator.taskMod(index, taskName, taskDate);
    taskEntry.replaceWith(input);
    
    let doneButton = document.querySelector(`[id="doneModificationTask"][data-counter="${index}"]`);
    doneButton.addEventListener("click", function (e) {
      let newName = document.querySelector(".input-task-name").value;
      let taskDate = document.querySelector("#task-date-input").value;
      control.modifyTask(index, selectedProject, newName, taskDate);
      refresh();
    });

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        let newName = document.querySelector(".input-task-name").value;
        control.modifyTask(index, selectedProject, newName);
        refresh();
      }
    });
  }

  function listenProjectTitleMod(e) {
    let index = e.target.dataset.counter;
    let projectEntry = document.querySelector(
      `.project-entry[data-counter="${index}"]`
    );
    let projectName = projectEntry.childNodes[0].textContent;
    let input = htmlCreator.projectMod(index, projectName);
    projectEntry.replaceWith(input);

    let doneButton = document.querySelector(
      `[id="doneModificationProject"][data-counter="${index}"]`
    );
    doneButton.addEventListener("click", function (e) {
      let newName = document.querySelector(".input-project-name").value;
      control.modifyProject(index, newName);
      refresh();
    });

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        let newName = document.querySelector(".input-project-name").value;
        control.modifyProject(index, newName);
        refresh();
      }
    });
  }

  function taskComplete(e) {
    control.taskComplete(e, selectedProject);
  }

  function refresh() {
    cacheDOM();
    buttonListener();
    populateProjects();
    populateTasks();
    listenProject();
    listenTask();
  }

  return {
    cacheDOM,
    buttonListener,
    refresh,
  };
})();

export { display };
