import { htmlCreator } from "./htmlCreator";
import { control } from "./logic";

let display = (function () {
  let projectAddButton;
  let taskAddButton;
  let projectContainer;
  let taskContainer;
  let selectedProject = 0;

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
    document
      .querySelectorAll(".project-data")
      [selectedProject].classList.add("project-entry-active");
  }

  function deleteTaskListen() {
    let taskDeleteButtons = document.querySelectorAll("#deleteTask");
    taskDeleteButtons.forEach((elem) =>
      elem.addEventListener("click", function (e) {
        control.deleteTask(e.target.dataset.counter, selectedProject);
        refresh();
      })
    );
  }

  function populateTasks() {
    taskContainer.innerHTML = "";
    let taskList = control.getProjects()[selectedProject].project.tasks;
    taskList.forEach((elem, index) => {
      taskContainer.appendChild(htmlCreator.task(index, elem.title));
    });
  }

  function createProject(e) {
    let indexProject = control.createProject();
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
          deleteProjectListen(e.target.dataset.counter);
        } else if (e.target.id == "editProject") {
          projectListen(e.target.dataset.counter);
          listenProjectTitleMod(e);
        } else {
          projectListen(e.target.dataset.counter);
        }
      })
    );
  }

  function projectListen(counter) {
    selectedProject = counter;
    refresh();
  }

  function deleteProjectListen(counter) {
    let newSize = control.deleteProject(counter) - 1;
    if (selectedProject > newSize) {
      selectedProject = selectedProject - 1;
    }
    refresh();
  }

  // PROJECT NAME EDIT WHEN EDIT BUTTON PRESSED
  function listenProjectTitleMod(e) {
    let index = e.target.dataset.counter;
    console.log(index);
    let projectEntry = document.querySelector(
      `.project-entry[data-counter="${index}"]`
    );
    // let projectName = projectEntry.
    console.dir(projectEntry);
    let projectName = projectEntry.childNodes[0].textContent;
    let input = htmlCreator.projectMod(index, projectName);
    console.log(projectName);
    projectEntry.replaceWith(input);
  }

  function refresh() {
    cacheDOM();
    buttonListener();
    populateProjects();
    populateTasks();
    deleteTaskListen();
    listenProject();
  }

  return {
    cacheDOM,
    buttonListener,
  };
})();

export { display };
