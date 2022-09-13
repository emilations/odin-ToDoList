import { projectFactory, taskFactory } from "./factories";
import { memory } from "./storage"

let control = (function () {

  let createProject = function () {
    let newProject = projectFactory();
    return (memory.addProject(newProject) - 1); //returns new project index
  };

  let createTask = function (indexProject) {
    let newTask = taskFactory();
    return (memory.addTask(indexProject, newTask) - 1);
  };

  let deleteTask = function (indexTask) {
    console.log(indexTask);
  }

  let modifyProject = function (indexProject) {
  }
  
  let getProjects = function () {
    return memory.getProject();
  };

  return {
    createProject,
    createTask,
    deleteTask,
    modifyProject,
    getProjects,
  };
})();

export { control };