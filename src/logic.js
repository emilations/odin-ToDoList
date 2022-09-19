import { projectFactory, taskFactory } from "./factories";
import { memory } from "./storage";

let control = (function () {
  let createProject = function () {
    let newProject = projectFactory();
    let counter = memory.addProject(newProject) - 1;
    let projectName = `New project`;
    modifyProject(counter, projectName);
    return counter; //returns new project index
  };

  let createTask = function (indexProject) {
    let newTask = taskFactory();
    let counter = memory.addTask(indexProject, newTask) - 1;
    let taskName = `New task`;
    modifyTask(counter, indexProject, taskName);
    return counter;
  };

  let deleteTask = function (indexTask, indexProject) {
    return memory.deleteTask(indexTask, indexProject);
  };

  function modifyProject(indexProject, title) {
    memory.editProject(indexProject, title);
  };

  function modifyTask(counter, indexProject, taskName) {
    memory.editTask(counter, indexProject, taskName);
  };

  let getProjects = function () {
    return memory.getProject();
  };

  function deleteProject(indexProject) {
    return memory.deleteProject(indexProject);
  };

  function taskComplete(e, selectedProject) {
    memory.completeTaskToggle(e.target.dataset.counter, selectedProject);
  };

  createProject();

  return {
    createProject,
    createTask,
    deleteTask,
    modifyProject,
    getProjects,
    deleteProject,
    modifyTask,
    taskComplete,
  };
})();

export { control };
