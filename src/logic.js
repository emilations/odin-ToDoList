import { project, task } from "./factories";
import { memory } from "./database";

let control = (function () {
  let createProject = function (projectTitle) {
    let newProject = project(projectTitle);
    memory.writeProject(newProject);
  };
  let getProjects = function () {
    return memory.getProject();
  };
  let createTask = function (taskTitle, projectTitle) {
    let newTask = task(taskTitle);
    memory.writeTask(newTask, projectTitle);
  };

  return {
    createProject,
    createTask,
    getProjects,
  };
})();

export { control };