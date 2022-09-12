// PROJECT FACTORY FUNCTION  --------------------------------------------------
let project = function (title) {
  let project = {
    title,
    tasks: [],
  }
  let addTask = function (newTask) {
    project.tasks.push(newTask)
  };
  return {
    project,
    addTask,
  };
};

// TASK FACTORY FUNCTION-------------------------------------------------------
let task = function (title, dueDate) {
  let task = {
    title,
    dueDate,
    done: false,
  };
  return {
    task,
  };
};

export { project, task }