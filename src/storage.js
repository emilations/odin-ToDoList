// MEMORY ---------------------------------------------------------------------
let memory = (function () {
  let projects = [];

  let addProject = function (project) {
    projects.push(project);
    database.createJSON();
    return getProjectCounter();
  };

  let addTask = function (indexProject, task) {
    projects[indexProject].addTask(task);
    database.createJSON();
    return getTaskCounter(indexProject);
  };

  let getProjectCounter = function () {
    return projects.length;
  };

  let getTaskCounter = function (indexProject) {
    return projects[indexProject].project.tasks.length;
  };

  let getProject = function () {
    return [...projects];
  };

  let deleteTask = function (indexTask, indexProject) {
    projects[indexProject].project.tasks.splice(indexTask, 1);
    database.createJSON();
    return projects[indexProject].project.tasks.length;
  };

  let editProject = function (indexProject, title) {
    projects[indexProject].project.title = title;
    database.createJSON();
  };

  let editTask = function (indexTask, indexProject, title, taskDate) {
    projects[indexProject].project.tasks[indexTask].title = title;
    projects[indexProject].project.tasks[indexTask].dueDate = taskDate;
    database.createJSON();
  };

  let completeTaskToggle = function (indexTask, indexProject) {
    if (projects[indexProject].project.tasks[indexTask].done) {
      projects[indexProject].project.tasks[indexTask].done = false;
    } else {
      projects[indexProject].project.tasks[indexTask].done = true;
    }
    database.createJSON();
  };

  let deleteProject = function (indexProject) {
    projects.splice(indexProject, 1);
    database.createJSON();
    return projects.length;
  };

  return {
    addProject,
    addTask,
    getProjectCounter,
    getTaskCounter,
    getProject,
    editProject,
    editTask,
    deleteTask,
    deleteProject,
    completeTaskToggle,
  };
})();

// DATABASE MODULE ------------------------------------------------------------
let database = (function () {
  let memoryObj = {
    projects: [{
        name : 'project1',
        tasks: [
          {
            name: 'task1',
            dueDate: "",
            done: false,
          },
          {
            name: 'task2',
            dueDate: "",
            done: false,
          }
        ]
      },
      {
        name : 'project2',
        tasks: [          {
          name: 'task1',
          dueDate: "",
          done: false,
        },
        {
          name: 'task2',
          dueDate: "",
          done: false,
        }]
      },
      {
        name : 'project1',
        tasks: []
      }
      ]
    };

  let createJSON = function () {
  let array = memory.getProject();
  // array.forEach((elem) => )
  console.dir(JSON.stringify(memoryObj))
  console.dir(JSON.parse(JSON.stringify(memoryObj)))
  }

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
    createJSON,
  };
})();

export { memory, database };
