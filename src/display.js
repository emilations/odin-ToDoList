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

  function projectListen() {
    let projects = document.querySelectorAll(".project-data");
    projects.forEach((elem) =>
      elem.addEventListener("click", function (e) {
        selectedProject = e.target.dataset.counter;
        refresh();
      })
    );
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

  function deleteProjectListen() {
    let ProjectDeleteButtons = document.querySelectorAll("#deleteProject");
    ProjectDeleteButtons.forEach((elem) =>
      elem.addEventListener("click", function (e) {
        control.deleteProject(e.target.dataset.counter);
        selectedProject = 0;
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

  function listenProjectTitleMod() {
    let editIcons = document.querySelectorAll("#editProject");
    editIcons.forEach((elem) => elem.addEventListener("click", modifyTitle))
    function modifyTitle(e) {
      let projectIndex = e.target.dataset.counter;
      let newTitle ="";
      console.log("ready")
      console.log(projectIndex)
    }
  }

  function refresh() {
    cacheDOM();
    buttonListener();
    populateProjects();
    populateTasks();  
    deleteTaskListen();
    projectListen();
    deleteProjectListen();
    listenProjectTitleMod();
    console.log("refreshed")
  }

  return {
    cacheDOM,
    buttonListener,
  };
})();

export { display };
