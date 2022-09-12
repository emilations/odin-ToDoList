import { htmlCreator } from "./htmlCreator";
import { control } from "./logic";

let display = (function () {
  let projectAddButton;
  let taskAddButton;
  let projectSelect;
  let taskSelect;

  let cacheDOM = function () {
    projectAddButton = document.querySelector(".project-add");
    taskAddButton = document.querySelector(".task-add");
    projectSelect = document.querySelector("#project-selector");
    taskSelect = document.querySelector("#task-selector");
  };

  let buttonListener = function () {
    projectAddButton.addEventListener("click", createProject);
  };

  function createProject(e) {
    control.createProject;
    projectSelect.appendChild(htmlCreator.project("New project"));
  }

  return {
    cacheDOM,
    buttonListener,
  };
})();

export { display };
