// MEMORY ---------------------------------------------------------------------

let memory = (function () {
  let projects = [];
  let writeProject = function (project) {
    projects.push(project);
  };
  let writeTask = function (task, projectTitle) {
    projects.forEach((elem) => write(elem));
    function write(e) {
      if (e.project.title == projectTitle) {
        e.addTask(task);
      }
    }
  };
  let getProject = function () {
    return [...projects];
  };
  return {
    writeProject,
    writeTask,
    getProject,
  };
})();

// DATABASE MODULE ------------------------------------------------------------
let database = (function () {
  let write = function (obj) {
    localStorage.setItem("main", JSON.stringify(obj));
  };

  let read = function () {
    return JSON.parse(localStorage.getItem("main"));
  };

  let reset = function () {};

  return {
    write,
    read,
    reset,
  };
})();

export { memory, database };
