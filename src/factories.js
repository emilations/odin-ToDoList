// PROJECT FACTORY FUNCTION  --------------------------------------------------
let projectFactory = function () {
  return {
    project: {
      title: "",
      tasks: [],
    },
    addTask: function (newTask) {
      this.project.tasks.push(newTask)
    },
  };
};

// TASK FACTORY FUNCTION-------------------------------------------------------
let taskFactory = function () {
  return {
    title: "",
    dueDate: "",
    done: false,
  };;
};

export { projectFactory, taskFactory }