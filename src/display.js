import { htmlCreator } from "./htmlCreator";
import { control } from "./logic";
import { memory } from "./storage";

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
    // taskDeleteButton.addEventListener()
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
    let projectList = memory.getProject();
    projectList.forEach((elem, index) => {
      projectContainer.appendChild(htmlCreator.project(index));
    });
    document
      .querySelectorAll(".project-data")
      [selectedProject].classList.add("project-entry-active");
  }

  function deleteTaskListen() {
    let taskDeleteButtons = document.querySelectorAll("#deleteTask");
    console.log(taskDeleteButtons)
    taskDeleteButtons.forEach((elem) => elem
      .addEventListener("click", function(e){
        control.deleteTask(e.target.dataset.counter)
      }))
  }

  function populateTasks() {
    taskContainer.innerHTML = "";
    let taskList = memory.getProject()[selectedProject].project.tasks;
    taskList.forEach((elem, index) => {
      taskContainer.appendChild(htmlCreator.task(index));
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

  function refresh() {
    cacheDOM();
    buttonListener();
    populateProjects();
    populateTasks();
    projectListen();
    deleteTaskListen();
  }

  return {
    cacheDOM,
    buttonListener,
  };
})();

export { display };
