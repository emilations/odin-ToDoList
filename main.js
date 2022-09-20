/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "display": () => (/* binding */ display)
/* harmony export */ });
/* harmony import */ var _htmlCreator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./htmlCreator */ "./src/htmlCreator.js");
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic */ "./src/logic.js");



let display = (function () {
  let projectAddButton;
  let taskAddButton;
  let projectContainer;
  let taskContainer;
  let selectedProject = 0;
  let selectedTask = 0;

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

  function populateProjects() {
    projectContainer.innerHTML = "";
    let projectList = _logic__WEBPACK_IMPORTED_MODULE_1__.control.getProjects();
    projectList.forEach((elem, index) => {
      projectContainer.appendChild(
        _htmlCreator__WEBPACK_IMPORTED_MODULE_0__.htmlCreator.project(index, elem.project.title)
      );
    });
    let active = document.querySelectorAll(".project-data")[selectedProject];
    if (!active) {
      return;
    }
    active.classList.add("project-entry-active");
    active.childNodes[1].src = "./assets/icons8-edit-96-active.png";
    active.childNodes[2].src = "./assets/icons8-trash-96-active.svg";
  }

  function populateTasks() {
    taskContainer.innerHTML = "";
    if (_logic__WEBPACK_IMPORTED_MODULE_1__.control.getProjects().length == 0) {
      selectedProject = 0;
      return;
    }
    let taskList = _logic__WEBPACK_IMPORTED_MODULE_1__.control.getProjects()[selectedProject].project.tasks;
    taskList.forEach((elem, index) => {
      let entry = _htmlCreator__WEBPACK_IMPORTED_MODULE_0__.htmlCreator.task(index, elem.title, elem.dueDate);
      if (elem.done) {
        entry.classList.add("task-completed")
        entry.childNodes[0].src = "./assets/icons8-checkmark_checked-96.png";
        entry.childNodes[3].src = "./assets/icons8-edit-96.png";
        entry.childNodes[4].src = "./assets/icons8-trash-96-nonactive.svg";
      }
      taskContainer.appendChild(entry);
    });
    let active = document.querySelectorAll(".task-data")[selectedTask];
    if (!active) {return}
    active.classList.add("task-entry-active");
  }

  function createProject(e) {
    _logic__WEBPACK_IMPORTED_MODULE_1__.control.createProject();
    refresh();
  }

  function createTask(e) {
    _logic__WEBPACK_IMPORTED_MODULE_1__.control.createTask(selectedProject);
    refresh();
  }

  function listenProject() {
    let projects = document.querySelectorAll(".project-data");
    projects.forEach((elem) =>
      elem.addEventListener("click", function (e) {
        if (e.target.id == "deleteProject") {
          deleteProject(e.target.dataset.counter);
        } else if (e.target.id == "editProject") {
          projectActive(e.target.dataset.counter);
          listenProjectTitleMod(e);
        } else {
          projectActive(e.target.dataset.counter);
        }
      })
    );
  }

  function listenTask() {
    let tasks = document.querySelectorAll(".task-data");
    tasks.forEach((elem) =>
      elem.addEventListener("click", function (e) {
        if (e.target.id == "deleteTask") {
          deleteTask(e.target.dataset.counter);
        } else if (e.target.id == "editTask") {
          taskActive(e.target.dataset.counter);
          listenTaskMod(e);
        } else if (e.target.id == "task-complete") {
          taskActive(e.target.dataset.counter);
          taskComplete(e);
          refresh();
        } else if (e.target.id == "task-date") {  
          taskActive(e.target.dataset.counter);
          listenTaskMod(e);
        } else {
          taskActive(e.target.dataset.counter);
        }
      })
    );
  }

  function taskActive(counter) {
    selectedTask = counter;
    refresh();
  }

  function projectActive(counter) {
    selectedProject = counter;
    refresh();
  }

  function deleteTask(taskCounter) {
    let newSize = _logic__WEBPACK_IMPORTED_MODULE_1__.control.deleteTask(taskCounter, selectedProject) - 1;
    console.log(newSize);
    if (selectedTask > newSize) {
      selectedTask = selectedTask - 1;
    }
    refresh();
  }

  function deleteProject(counter) {
    let newSize = _logic__WEBPACK_IMPORTED_MODULE_1__.control.deleteProject(counter) - 1;
    if (selectedProject > newSize) {
      selectedProject = selectedProject - 1;
    }
    refresh();
  }

  function listenTaskMod(e) {
    let index = e.target.dataset.counter;
    let taskEntry = document.querySelector(`.task-entry[data-counter="${index}"]`);
    let taskName = taskEntry.childNodes[1].textContent;
    let taskDate = taskEntry.childNodes[2].textContent;
    let input = _htmlCreator__WEBPACK_IMPORTED_MODULE_0__.htmlCreator.taskMod(index, taskName, taskDate);
    taskEntry.replaceWith(input);
    
    let doneButton = document.querySelector(`[id="doneModificationTask"][data-counter="${index}"]`);
    doneButton.addEventListener("click", function (e) {
      let newName = document.querySelector(".input-task-name").value;
      let taskDate = document.querySelector("#task-date-input").value;
      _logic__WEBPACK_IMPORTED_MODULE_1__.control.modifyTask(index, selectedProject, newName, taskDate);
      refresh();
    });

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        let newName = document.querySelector(".input-task-name").value;
        _logic__WEBPACK_IMPORTED_MODULE_1__.control.modifyTask(index, selectedProject, newName);
        refresh();
      }
    });
  }

  function listenProjectTitleMod(e) {
    let index = e.target.dataset.counter;
    let projectEntry = document.querySelector(
      `.project-entry[data-counter="${index}"]`
    );
    let projectName = projectEntry.childNodes[0].textContent;
    let input = _htmlCreator__WEBPACK_IMPORTED_MODULE_0__.htmlCreator.projectMod(index, projectName);
    projectEntry.replaceWith(input);

    let doneButton = document.querySelector(
      `[id="doneModificationProject"][data-counter="${index}"]`
    );
    doneButton.addEventListener("click", function (e) {
      let newName = document.querySelector(".input-project-name").value;
      _logic__WEBPACK_IMPORTED_MODULE_1__.control.modifyProject(index, newName);
      refresh();
    });

    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        let newName = document.querySelector(".input-project-name").value;
        _logic__WEBPACK_IMPORTED_MODULE_1__.control.modifyProject(index, newName);
        refresh();
      }
    });
  }

  function taskComplete(e) {
    _logic__WEBPACK_IMPORTED_MODULE_1__.control.taskComplete(e, selectedProject);
  }

  function refresh() {
    cacheDOM();
    buttonListener();
    populateProjects();
    populateTasks();
    listenProject();
    listenTask();
  }

  return {
    cacheDOM,
    buttonListener,
    refresh,
  };
})();




/***/ }),

/***/ "./src/factories.js":
/*!**************************!*\
  !*** ./src/factories.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectFactory": () => (/* binding */ projectFactory),
/* harmony export */   "taskFactory": () => (/* binding */ taskFactory)
/* harmony export */ });
// PROJECT FACTORY FUNCTION  --------------------------------------------------
let projectFactory = function (title) {
  return {
    project: {
      title,
      tasks: [],
    },
    addTask: function (newTask) {
      this.project.tasks.push(newTask)
    },
  };
};

// TASK FACTORY FUNCTION-------------------------------------------------------
let taskFactory = function (title) {
  return {
    title,
    dueDate: "",
    done: false,
  };;
};



/***/ }),

/***/ "./src/htmlCreator.js":
/*!****************************!*\
  !*** ./src/htmlCreator.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "htmlCreator": () => (/* binding */ htmlCreator)
/* harmony export */ });
// CREATE THE HTML FOR THE PROJECT ENTRY --------------------------------------
let htmlCreator = (function () {
  let project = function (index, title) {
    let projectEntry = document.createElement("div");
    projectEntry.classList.add("project-entry", "project-data");
    projectEntry.setAttribute("data-counter", index);

    let projectName = document.createElement("div");
    projectName.textContent = title;
    projectName.classList.add("project-name");
    projectName.setAttribute("data-counter", index);

    let editIcon = document.createElement("img");
    editIcon.setAttribute("id", "editProject");
    editIcon.src = "./assets/icons8-edit-96.png";
    editIcon.setAttribute("data-counter", index);
    editIcon.alt = "Edit Icon";

    let deleteIcon = document.createElement("img");
    deleteIcon.setAttribute("id", "deleteProject");
    deleteIcon.src = "/assets/icons8-trash-96-nonactive.svg";
    deleteIcon.setAttribute("data-counter", index);
    deleteIcon.alt = "delete Icon";

    projectEntry.appendChild(projectName);
    projectEntry.appendChild(editIcon);
    projectEntry.appendChild(deleteIcon);

    return projectEntry;
  };

  // CREATE THE HTML FOR THE PROJECT ENTRY MODIFICATION

  let projectMod = function (index, title) {
    let projectEntry = document.createElement("div");
    projectEntry.classList.add("project-entry", "project-data", "project-entry-active");
    projectEntry.setAttribute("data-counter", index);

    let input = document.createElement("input");
    input.classList.add("input-project-name")
    input.setAttribute("data-counter", index);
    input.type = "text";
    input.value = title;

    let doneIcon = document.createElement("img");
    doneIcon.setAttribute("id", "doneModificationProject");
    doneIcon.src = "./assets/icons8-done-96.png";
    doneIcon.setAttribute("data-counter", index);
    doneIcon.alt = "Done Icon";

    let deleteIcon = document.createElement("img");
    deleteIcon.setAttribute("id", "deleteProject");
    deleteIcon.src = "/assets/icons8-trash-96-active.svg";
    deleteIcon.setAttribute("data-counter", index);
    deleteIcon.alt = "delete Icon";

    projectEntry.appendChild(input);
    projectEntry.appendChild(doneIcon);
    projectEntry.appendChild(deleteIcon);

    return projectEntry;
  };

  // CREATE THE HTML FOR THE TASK ENTRY -----------------------------------------
  let task = function (index, title, date) {
    let taskEntry = document.createElement("div");
    taskEntry.classList.add("task-entry", "task-data");
    taskEntry.setAttribute("data-counter", index);

    let checkmarkIcon = document.createElement("img");
    checkmarkIcon.src = "./assets/icons8-checkmark_unchecked-96.png";
    checkmarkIcon.setAttribute("id", "task-complete")
    checkmarkIcon.setAttribute("data-counter", index);
    checkmarkIcon.alt = "delete Icon";

    let taskName = document.createElement("div");
    taskName.textContent = title;
    taskName.classList.add("task-name");
    taskName.setAttribute("data-counter", index);

    let taskDate = document.createElement("p");
    taskDate.textContent = date;
    taskDate.classList.add('task-date')
    taskDate.setAttribute("id", "task-date");

    let editIcon = document.createElement("img");
    editIcon.setAttribute("id", "editTask");
    editIcon.src = "./assets/icons8-edit-96-active.png";
    editIcon.setAttribute("data-counter", index);
    editIcon.alt = "Edit Icon";

    let deleteIcon = document.createElement("img");
    deleteIcon.setAttribute("id", "deleteTask");
    deleteIcon.setAttribute("data-counter", index);
    deleteIcon.src = "./assets/icons8-trash-96-active.svg";
    deleteIcon.alt = "delete Icon";

    taskEntry.appendChild(checkmarkIcon);
    taskEntry.appendChild(taskName);
    taskEntry.appendChild(taskDate);
    taskEntry.appendChild(editIcon);
    taskEntry.appendChild(deleteIcon);

    return taskEntry;
  };

  let taskMod = function (index, title, date) {
    let taskEntry = document.createElement("div");
    taskEntry.classList.add("task-entry", "task-data", "task-entry-active");
    taskEntry.setAttribute("data-counter", index);

    let checkmarkIcon = document.createElement("img");
    checkmarkIcon.src = "./assets/icons8-checkmark_unchecked-96.png";
    checkmarkIcon.alt = "delete Icon";

    let input = document.createElement("input");
    input.classList.add("input-task-name")
    input.setAttribute("data-counter", index);
    input.type = "text";
    input.value = title;

    let taskDate = document.createElement("input");
    taskDate.type = "date";
    taskDate.value = date;
    taskDate.classList.add("task-date");
    taskDate.setAttribute("id", "task-date-input");

    let doneIcon = document.createElement("img");
    doneIcon.setAttribute("id", "doneModificationTask");
    doneIcon.src = "./assets/icons8-done-96.png";
    doneIcon.setAttribute("data-counter", index);
    doneIcon.alt = "Done Icon";

    let deleteIcon = document.createElement("img");
    deleteIcon.setAttribute("id", "deleteTask");
    deleteIcon.setAttribute("data-counter", index);
    deleteIcon.src = "./assets/icons8-trash-96-active.svg";
    deleteIcon.alt = "delete Icon";

    taskEntry.appendChild(checkmarkIcon);
    taskEntry.appendChild(input);
    taskEntry.appendChild(taskDate);
    taskEntry.appendChild(doneIcon);
    taskEntry.appendChild(deleteIcon);

    return taskEntry;
  };

  return {
    project,
    projectMod,
    task,
    taskMod,
  };
})();



/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "control": () => (/* binding */ control)
/* harmony export */ });
/* harmony import */ var _factories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories */ "./src/factories.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/storage.js");



let control = (function () {
  let createProject = function () {
    let newProject = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.projectFactory)();
    let counter = _storage__WEBPACK_IMPORTED_MODULE_1__.memory.addProject(newProject) - 1;
    let projectName = `New project`;
    modifyProject(counter, projectName);
    return counter; //returns new project index
  };

  let createTask = function (indexProject) {
    let newTask = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.taskFactory)();
    let counter = _storage__WEBPACK_IMPORTED_MODULE_1__.memory.addTask(indexProject, newTask) - 1;
    let taskName = `New task`;
    modifyTask(counter, indexProject, taskName);
    return counter;
  };

  let deleteTask = function (indexTask, indexProject) {
    return _storage__WEBPACK_IMPORTED_MODULE_1__.memory.deleteTask(indexTask, indexProject);
  };

  function modifyProject(indexProject, title) {
    _storage__WEBPACK_IMPORTED_MODULE_1__.memory.editProject(indexProject, title);
  };

  function modifyTask(counter, indexProject, taskName, taskDate) {
    _storage__WEBPACK_IMPORTED_MODULE_1__.memory.editTask(counter, indexProject, taskName, taskDate);
  };

  let getProjects = function () {
    return _storage__WEBPACK_IMPORTED_MODULE_1__.memory.getProject();
  };

  function deleteProject(indexProject) {
    return _storage__WEBPACK_IMPORTED_MODULE_1__.memory.deleteProject(indexProject);
  };

  function taskComplete(e, selectedProject) {
    _storage__WEBPACK_IMPORTED_MODULE_1__.memory.completeTaskToggle(e.target.dataset.counter, selectedProject);
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




/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "database": () => (/* binding */ database),
/* harmony export */   "memory": () => (/* binding */ memory)
/* harmony export */ });
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
  let memoryobj = {
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
  console.dir(JSON.stringify(stringJSON))
  console.dir(JSON.parse(JSON.stringify(stringJSON)))
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic */ "./src/logic.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display */ "./src/display.js");






window.control = _logic__WEBPACK_IMPORTED_MODULE_0__.control;
window.memory = _storage__WEBPACK_IMPORTED_MODULE_1__.memory;

_display__WEBPACK_IMPORTED_MODULE_2__.display.refresh()
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWdCLDRDQUFNOztBQUV0QixxREFBZSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvZmFjdG9yaWVzLmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvaHRtbENyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHRtbENyZWF0b3IgfSBmcm9tIFwiLi9odG1sQ3JlYXRvclwiO1xuaW1wb3J0IHsgY29udHJvbCB9IGZyb20gXCIuL2xvZ2ljXCI7XG5cbmxldCBkaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHByb2plY3RBZGRCdXR0b247XG4gIGxldCB0YXNrQWRkQnV0dG9uO1xuICBsZXQgcHJvamVjdENvbnRhaW5lcjtcbiAgbGV0IHRhc2tDb250YWluZXI7XG4gIGxldCBzZWxlY3RlZFByb2plY3QgPSAwO1xuICBsZXQgc2VsZWN0ZWRUYXNrID0gMDtcblxuICBmdW5jdGlvbiBjYWNoZURPTSgpIHtcbiAgICBwcm9qZWN0QWRkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWFkZFwiKTtcbiAgICB0YXNrQWRkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWFkZFwiKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXNlbGVjdG9yXCIpO1xuICAgIHRhc2tDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stc2VsZWN0b3JcIik7XG4gIH1cblxuICBmdW5jdGlvbiBidXR0b25MaXN0ZW5lcigpIHtcbiAgICBwcm9qZWN0QWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjcmVhdGVQcm9qZWN0KTtcbiAgICB0YXNrQWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjcmVhdGVUYXNrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvcHVsYXRlUHJvamVjdHMoKSB7XG4gICAgcHJvamVjdENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGxldCBwcm9qZWN0TGlzdCA9IGNvbnRyb2wuZ2V0UHJvamVjdHMoKTtcbiAgICBwcm9qZWN0TGlzdC5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xuICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChcbiAgICAgICAgaHRtbENyZWF0b3IucHJvamVjdChpbmRleCwgZWxlbS5wcm9qZWN0LnRpdGxlKVxuICAgICAgKTtcbiAgICB9KTtcbiAgICBsZXQgYWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LWRhdGFcIilbc2VsZWN0ZWRQcm9qZWN0XTtcbiAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhY3RpdmUuY2xhc3NMaXN0LmFkZChcInByb2plY3QtZW50cnktYWN0aXZlXCIpO1xuICAgIGFjdGl2ZS5jaGlsZE5vZGVzWzFdLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWVkaXQtOTYtYWN0aXZlLnBuZ1wiO1xuICAgIGFjdGl2ZS5jaGlsZE5vZGVzWzJdLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LXRyYXNoLTk2LWFjdGl2ZS5zdmdcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvcHVsYXRlVGFza3MoKSB7XG4gICAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGlmIChjb250cm9sLmdldFByb2plY3RzKCkubGVuZ3RoID09IDApIHtcbiAgICAgIHNlbGVjdGVkUHJvamVjdCA9IDA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCB0YXNrTGlzdCA9IGNvbnRyb2wuZ2V0UHJvamVjdHMoKVtzZWxlY3RlZFByb2plY3RdLnByb2plY3QudGFza3M7XG4gICAgdGFza0xpc3QuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgIGxldCBlbnRyeSA9IGh0bWxDcmVhdG9yLnRhc2soaW5kZXgsIGVsZW0udGl0bGUsIGVsZW0uZHVlRGF0ZSk7XG4gICAgICBpZiAoZWxlbS5kb25lKSB7XG4gICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNvbXBsZXRlZFwiKVxuICAgICAgICBlbnRyeS5jaGlsZE5vZGVzWzBdLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWNoZWNrbWFya19jaGVja2VkLTk2LnBuZ1wiO1xuICAgICAgICBlbnRyeS5jaGlsZE5vZGVzWzNdLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWVkaXQtOTYucG5nXCI7XG4gICAgICAgIGVudHJ5LmNoaWxkTm9kZXNbNF0uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtdHJhc2gtOTYtbm9uYWN0aXZlLnN2Z1wiO1xuICAgICAgfVxuICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbnRyeSk7XG4gICAgfSk7XG4gICAgbGV0IGFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzay1kYXRhXCIpW3NlbGVjdGVkVGFza107XG4gICAgaWYgKCFhY3RpdmUpIHtyZXR1cm59XG4gICAgYWN0aXZlLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWVudHJ5LWFjdGl2ZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QoZSkge1xuICAgIGNvbnRyb2wuY3JlYXRlUHJvamVjdCgpO1xuICAgIHJlZnJlc2goKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVRhc2soZSkge1xuICAgIGNvbnRyb2wuY3JlYXRlVGFzayhzZWxlY3RlZFByb2plY3QpO1xuICAgIHJlZnJlc2goKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlblByb2plY3QoKSB7XG4gICAgbGV0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LWRhdGFcIik7XG4gICAgcHJvamVjdHMuZm9yRWFjaCgoZWxlbSkgPT5cbiAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5pZCA9PSBcImRlbGV0ZVByb2plY3RcIikge1xuICAgICAgICAgIGRlbGV0ZVByb2plY3QoZS50YXJnZXQuZGF0YXNldC5jb3VudGVyKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5pZCA9PSBcImVkaXRQcm9qZWN0XCIpIHtcbiAgICAgICAgICBwcm9qZWN0QWN0aXZlKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcik7XG4gICAgICAgICAgbGlzdGVuUHJvamVjdFRpdGxlTW9kKGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2plY3RBY3RpdmUoZS50YXJnZXQuZGF0YXNldC5jb3VudGVyKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuVGFzaygpIHtcbiAgICBsZXQgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2stZGF0YVwiKTtcbiAgICB0YXNrcy5mb3JFYWNoKChlbGVtKSA9PlxuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09IFwiZGVsZXRlVGFza1wiKSB7XG4gICAgICAgICAgZGVsZXRlVGFzayhlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmlkID09IFwiZWRpdFRhc2tcIikge1xuICAgICAgICAgIHRhc2tBY3RpdmUoZS50YXJnZXQuZGF0YXNldC5jb3VudGVyKTtcbiAgICAgICAgICBsaXN0ZW5UYXNrTW9kKGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmlkID09IFwidGFzay1jb21wbGV0ZVwiKSB7XG4gICAgICAgICAgdGFza0FjdGl2ZShlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIpO1xuICAgICAgICAgIHRhc2tDb21wbGV0ZShlKTtcbiAgICAgICAgICByZWZyZXNoKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaWQgPT0gXCJ0YXNrLWRhdGVcIikgeyAgXG4gICAgICAgICAgdGFza0FjdGl2ZShlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIpO1xuICAgICAgICAgIGxpc3RlblRhc2tNb2QoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFza0FjdGl2ZShlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiB0YXNrQWN0aXZlKGNvdW50ZXIpIHtcbiAgICBzZWxlY3RlZFRhc2sgPSBjb3VudGVyO1xuICAgIHJlZnJlc2goKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2plY3RBY3RpdmUoY291bnRlcikge1xuICAgIHNlbGVjdGVkUHJvamVjdCA9IGNvdW50ZXI7XG4gICAgcmVmcmVzaCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlVGFzayh0YXNrQ291bnRlcikge1xuICAgIGxldCBuZXdTaXplID0gY29udHJvbC5kZWxldGVUYXNrKHRhc2tDb3VudGVyLCBzZWxlY3RlZFByb2plY3QpIC0gMTtcbiAgICBjb25zb2xlLmxvZyhuZXdTaXplKTtcbiAgICBpZiAoc2VsZWN0ZWRUYXNrID4gbmV3U2l6ZSkge1xuICAgICAgc2VsZWN0ZWRUYXNrID0gc2VsZWN0ZWRUYXNrIC0gMTtcbiAgICB9XG4gICAgcmVmcmVzaCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlUHJvamVjdChjb3VudGVyKSB7XG4gICAgbGV0IG5ld1NpemUgPSBjb250cm9sLmRlbGV0ZVByb2plY3QoY291bnRlcikgLSAxO1xuICAgIGlmIChzZWxlY3RlZFByb2plY3QgPiBuZXdTaXplKSB7XG4gICAgICBzZWxlY3RlZFByb2plY3QgPSBzZWxlY3RlZFByb2plY3QgLSAxO1xuICAgIH1cbiAgICByZWZyZXNoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5UYXNrTW9kKGUpIHtcbiAgICBsZXQgaW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXI7XG4gICAgbGV0IHRhc2tFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC50YXNrLWVudHJ5W2RhdGEtY291bnRlcj1cIiR7aW5kZXh9XCJdYCk7XG4gICAgbGV0IHRhc2tOYW1lID0gdGFza0VudHJ5LmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnQ7XG4gICAgbGV0IHRhc2tEYXRlID0gdGFza0VudHJ5LmNoaWxkTm9kZXNbMl0udGV4dENvbnRlbnQ7XG4gICAgbGV0IGlucHV0ID0gaHRtbENyZWF0b3IudGFza01vZChpbmRleCwgdGFza05hbWUsIHRhc2tEYXRlKTtcbiAgICB0YXNrRW50cnkucmVwbGFjZVdpdGgoaW5wdXQpO1xuICAgIFxuICAgIGxldCBkb25lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2lkPVwiZG9uZU1vZGlmaWNhdGlvblRhc2tcIl1bZGF0YS1jb3VudGVyPVwiJHtpbmRleH1cIl1gKTtcbiAgICBkb25lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgbGV0IG5ld05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmlucHV0LXRhc2stbmFtZVwiKS52YWx1ZTtcbiAgICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlLWlucHV0XCIpLnZhbHVlO1xuICAgICAgY29udHJvbC5tb2RpZnlUYXNrKGluZGV4LCBzZWxlY3RlZFByb2plY3QsIG5ld05hbWUsIHRhc2tEYXRlKTtcbiAgICAgIHJlZnJlc2goKTtcbiAgICB9KTtcblxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgbGV0IG5ld05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmlucHV0LXRhc2stbmFtZVwiKS52YWx1ZTtcbiAgICAgICAgY29udHJvbC5tb2RpZnlUYXNrKGluZGV4LCBzZWxlY3RlZFByb2plY3QsIG5ld05hbWUpO1xuICAgICAgICByZWZyZXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5Qcm9qZWN0VGl0bGVNb2QoZSkge1xuICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcjtcbiAgICBsZXQgcHJvamVjdEVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAucHJvamVjdC1lbnRyeVtkYXRhLWNvdW50ZXI9XCIke2luZGV4fVwiXWBcbiAgICApO1xuICAgIGxldCBwcm9qZWN0TmFtZSA9IHByb2plY3RFbnRyeS5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50O1xuICAgIGxldCBpbnB1dCA9IGh0bWxDcmVhdG9yLnByb2plY3RNb2QoaW5kZXgsIHByb2plY3ROYW1lKTtcbiAgICBwcm9qZWN0RW50cnkucmVwbGFjZVdpdGgoaW5wdXQpO1xuXG4gICAgbGV0IGRvbmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtpZD1cImRvbmVNb2RpZmljYXRpb25Qcm9qZWN0XCJdW2RhdGEtY291bnRlcj1cIiR7aW5kZXh9XCJdYFxuICAgICk7XG4gICAgZG9uZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGxldCBuZXdOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC1wcm9qZWN0LW5hbWVcIikudmFsdWU7XG4gICAgICBjb250cm9sLm1vZGlmeVByb2plY3QoaW5kZXgsIG5ld05hbWUpO1xuICAgICAgcmVmcmVzaCgpO1xuICAgIH0pO1xuXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICBsZXQgbmV3TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXQtcHJvamVjdC1uYW1lXCIpLnZhbHVlO1xuICAgICAgICBjb250cm9sLm1vZGlmeVByb2plY3QoaW5kZXgsIG5ld05hbWUpO1xuICAgICAgICByZWZyZXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB0YXNrQ29tcGxldGUoZSkge1xuICAgIGNvbnRyb2wudGFza0NvbXBsZXRlKGUsIHNlbGVjdGVkUHJvamVjdCk7XG4gIH1cblxuICBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgIGNhY2hlRE9NKCk7XG4gICAgYnV0dG9uTGlzdGVuZXIoKTtcbiAgICBwb3B1bGF0ZVByb2plY3RzKCk7XG4gICAgcG9wdWxhdGVUYXNrcygpO1xuICAgIGxpc3RlblByb2plY3QoKTtcbiAgICBsaXN0ZW5UYXNrKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNhY2hlRE9NLFxuICAgIGJ1dHRvbkxpc3RlbmVyLFxuICAgIHJlZnJlc2gsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBkaXNwbGF5IH07XG4iLCIvLyBQUk9KRUNUIEZBQ1RPUlkgRlVOQ1RJT04gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgcHJvamVjdEZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0OiB7XG4gICAgICB0aXRsZSxcbiAgICAgIHRhc2tzOiBbXSxcbiAgICB9LFxuICAgIGFkZFRhc2s6IGZ1bmN0aW9uIChuZXdUYXNrKSB7XG4gICAgICB0aGlzLnByb2plY3QudGFza3MucHVzaChuZXdUYXNrKVxuICAgIH0sXG4gIH07XG59O1xuXG4vLyBUQVNLIEZBQ1RPUlkgRlVOQ1RJT04tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgdGFza0ZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgICBkdWVEYXRlOiBcIlwiLFxuICAgIGRvbmU6IGZhbHNlLFxuICB9Oztcbn07XG5cbmV4cG9ydCB7IHByb2plY3RGYWN0b3J5LCB0YXNrRmFjdG9yeSB9IiwiLy8gQ1JFQVRFIFRIRSBIVE1MIEZPUiBUSEUgUFJPSkVDVCBFTlRSWSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IGh0bWxDcmVhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHByb2plY3QgPSBmdW5jdGlvbiAoaW5kZXgsIHRpdGxlKSB7XG4gICAgbGV0IHByb2plY3RFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdEVudHJ5LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVudHJ5XCIsIFwicHJvamVjdC1kYXRhXCIpO1xuICAgIHByb2plY3RFbnRyeS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuXG4gICAgbGV0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgIHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XG4gICAgcHJvamVjdE5hbWUuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcblxuICAgIGxldCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJlZGl0UHJvamVjdFwiKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1lZGl0LTk2LnBuZ1wiO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZWRpdEljb24uYWx0ID0gXCJFZGl0IEljb25cIjtcblxuICAgIGxldCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGVsZXRlUHJvamVjdFwiKTtcbiAgICBkZWxldGVJY29uLnNyYyA9IFwiL2Fzc2V0cy9pY29uczgtdHJhc2gtOTYtbm9uYWN0aXZlLnN2Z1wiO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBkZWxldGVJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIHByb2plY3RFbnRyeS5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG4gICAgcHJvamVjdEVudHJ5LmFwcGVuZENoaWxkKGVkaXRJY29uKTtcbiAgICBwcm9qZWN0RW50cnkuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG5cbiAgICByZXR1cm4gcHJvamVjdEVudHJ5O1xuICB9O1xuXG4gIC8vIENSRUFURSBUSEUgSFRNTCBGT1IgVEhFIFBST0pFQ1QgRU5UUlkgTU9ESUZJQ0FUSU9OXG5cbiAgbGV0IHByb2plY3RNb2QgPSBmdW5jdGlvbiAoaW5kZXgsIHRpdGxlKSB7XG4gICAgbGV0IHByb2plY3RFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdEVudHJ5LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVudHJ5XCIsIFwicHJvamVjdC1kYXRhXCIsIFwicHJvamVjdC1lbnRyeS1hY3RpdmVcIik7XG4gICAgcHJvamVjdEVudHJ5LnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG5cbiAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChcImlucHV0LXByb2plY3QtbmFtZVwiKVxuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgaW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgIGlucHV0LnZhbHVlID0gdGl0bGU7XG5cbiAgICBsZXQgZG9uZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGRvbmVJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZG9uZU1vZGlmaWNhdGlvblByb2plY3RcIik7XG4gICAgZG9uZUljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtZG9uZS05Ni5wbmdcIjtcbiAgICBkb25lSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGRvbmVJY29uLmFsdCA9IFwiRG9uZSBJY29uXCI7XG5cbiAgICBsZXQgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRlbGV0ZVByb2plY3RcIik7XG4gICAgZGVsZXRlSWNvbi5zcmMgPSBcIi9hc3NldHMvaWNvbnM4LXRyYXNoLTk2LWFjdGl2ZS5zdmdcIjtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZGVsZXRlSWNvbi5hbHQgPSBcImRlbGV0ZSBJY29uXCI7XG5cbiAgICBwcm9qZWN0RW50cnkuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgIHByb2plY3RFbnRyeS5hcHBlbmRDaGlsZChkb25lSWNvbik7XG4gICAgcHJvamVjdEVudHJ5LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuXG4gICAgcmV0dXJuIHByb2plY3RFbnRyeTtcbiAgfTtcblxuICAvLyBDUkVBVEUgVEhFIEhUTUwgRk9SIFRIRSBUQVNLIEVOVFJZIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGxldCB0YXNrID0gZnVuY3Rpb24gKGluZGV4LCB0aXRsZSwgZGF0ZSkge1xuICAgIGxldCB0YXNrRW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tFbnRyeS5jbGFzc0xpc3QuYWRkKFwidGFzay1lbnRyeVwiLCBcInRhc2stZGF0YVwiKTtcbiAgICB0YXNrRW50cnkuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcblxuICAgIGxldCBjaGVja21hcmtJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBjaGVja21hcmtJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWNoZWNrbWFya191bmNoZWNrZWQtOTYucG5nXCI7XG4gICAgY2hlY2ttYXJrSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRhc2stY29tcGxldGVcIilcbiAgICBjaGVja21hcmtJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgY2hlY2ttYXJrSWNvbi5hbHQgPSBcImRlbGV0ZSBJY29uXCI7XG5cbiAgICBsZXQgdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tOYW1lLnRleHRDb250ZW50ID0gdGl0bGU7XG4gICAgdGFza05hbWUuY2xhc3NMaXN0LmFkZChcInRhc2stbmFtZVwiKTtcbiAgICB0YXNrTmFtZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuXG4gICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdGFza0RhdGUudGV4dENvbnRlbnQgPSBkYXRlO1xuICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGF0ZScpXG4gICAgdGFza0RhdGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0YXNrLWRhdGVcIik7XG5cbiAgICBsZXQgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZWRpdFRhc2tcIik7XG4gICAgZWRpdEljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtZWRpdC05Ni1hY3RpdmUucG5nXCI7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBlZGl0SWNvbi5hbHQgPSBcIkVkaXQgSWNvblwiO1xuXG4gICAgbGV0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkZWxldGVUYXNrXCIpO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBkZWxldGVJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LXRyYXNoLTk2LWFjdGl2ZS5zdmdcIjtcbiAgICBkZWxldGVJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZChjaGVja21hcmtJY29uKTtcbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQodGFza05hbWUpO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGVkaXRJY29uKTtcbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG5cbiAgICByZXR1cm4gdGFza0VudHJ5O1xuICB9O1xuXG4gIGxldCB0YXNrTW9kID0gZnVuY3Rpb24gKGluZGV4LCB0aXRsZSwgZGF0ZSkge1xuICAgIGxldCB0YXNrRW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tFbnRyeS5jbGFzc0xpc3QuYWRkKFwidGFzay1lbnRyeVwiLCBcInRhc2stZGF0YVwiLCBcInRhc2stZW50cnktYWN0aXZlXCIpO1xuICAgIHRhc2tFbnRyeS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuXG4gICAgbGV0IGNoZWNrbWFya0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGNoZWNrbWFya0ljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtY2hlY2ttYXJrX3VuY2hlY2tlZC05Ni5wbmdcIjtcbiAgICBjaGVja21hcmtJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtdGFzay1uYW1lXCIpXG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBpbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgaW5wdXQudmFsdWUgPSB0aXRsZTtcblxuICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0YXNrRGF0ZS50eXBlID0gXCJkYXRlXCI7XG4gICAgdGFza0RhdGUudmFsdWUgPSBkYXRlO1xuICAgIHRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWRhdGVcIik7XG4gICAgdGFza0RhdGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0YXNrLWRhdGUtaW5wdXRcIik7XG5cbiAgICBsZXQgZG9uZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGRvbmVJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZG9uZU1vZGlmaWNhdGlvblRhc2tcIik7XG4gICAgZG9uZUljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtZG9uZS05Ni5wbmdcIjtcbiAgICBkb25lSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGRvbmVJY29uLmFsdCA9IFwiRG9uZSBJY29uXCI7XG5cbiAgICBsZXQgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRlbGV0ZVRhc2tcIik7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGRlbGV0ZUljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtdHJhc2gtOTYtYWN0aXZlLnN2Z1wiO1xuICAgIGRlbGV0ZUljb24uYWx0ID0gXCJkZWxldGUgSWNvblwiO1xuXG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGNoZWNrbWFya0ljb24pO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQoZG9uZUljb24pO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcblxuICAgIHJldHVybiB0YXNrRW50cnk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0LFxuICAgIHByb2plY3RNb2QsXG4gICAgdGFzayxcbiAgICB0YXNrTW9kLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgaHRtbENyZWF0b3IgfTsiLCJpbXBvcnQgeyBwcm9qZWN0RmFjdG9yeSwgdGFza0ZhY3RvcnkgfSBmcm9tIFwiLi9mYWN0b3JpZXNcIjtcbmltcG9ydCB7IG1lbW9yeSB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxubGV0IGNvbnRyb2wgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgY3JlYXRlUHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3RGYWN0b3J5KCk7XG4gICAgbGV0IGNvdW50ZXIgPSBtZW1vcnkuYWRkUHJvamVjdChuZXdQcm9qZWN0KSAtIDE7XG4gICAgbGV0IHByb2plY3ROYW1lID0gYE5ldyBwcm9qZWN0YDtcbiAgICBtb2RpZnlQcm9qZWN0KGNvdW50ZXIsIHByb2plY3ROYW1lKTtcbiAgICByZXR1cm4gY291bnRlcjsgLy9yZXR1cm5zIG5ldyBwcm9qZWN0IGluZGV4XG4gIH07XG5cbiAgbGV0IGNyZWF0ZVRhc2sgPSBmdW5jdGlvbiAoaW5kZXhQcm9qZWN0KSB7XG4gICAgbGV0IG5ld1Rhc2sgPSB0YXNrRmFjdG9yeSgpO1xuICAgIGxldCBjb3VudGVyID0gbWVtb3J5LmFkZFRhc2soaW5kZXhQcm9qZWN0LCBuZXdUYXNrKSAtIDE7XG4gICAgbGV0IHRhc2tOYW1lID0gYE5ldyB0YXNrYDtcbiAgICBtb2RpZnlUYXNrKGNvdW50ZXIsIGluZGV4UHJvamVjdCwgdGFza05hbWUpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuXG4gIGxldCBkZWxldGVUYXNrID0gZnVuY3Rpb24gKGluZGV4VGFzaywgaW5kZXhQcm9qZWN0KSB7XG4gICAgcmV0dXJuIG1lbW9yeS5kZWxldGVUYXNrKGluZGV4VGFzaywgaW5kZXhQcm9qZWN0KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtb2RpZnlQcm9qZWN0KGluZGV4UHJvamVjdCwgdGl0bGUpIHtcbiAgICBtZW1vcnkuZWRpdFByb2plY3QoaW5kZXhQcm9qZWN0LCB0aXRsZSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbW9kaWZ5VGFzayhjb3VudGVyLCBpbmRleFByb2plY3QsIHRhc2tOYW1lLCB0YXNrRGF0ZSkge1xuICAgIG1lbW9yeS5lZGl0VGFzayhjb3VudGVyLCBpbmRleFByb2plY3QsIHRhc2tOYW1lLCB0YXNrRGF0ZSk7XG4gIH07XG5cbiAgbGV0IGdldFByb2plY3RzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBtZW1vcnkuZ2V0UHJvamVjdCgpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoaW5kZXhQcm9qZWN0KSB7XG4gICAgcmV0dXJuIG1lbW9yeS5kZWxldGVQcm9qZWN0KGluZGV4UHJvamVjdCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gdGFza0NvbXBsZXRlKGUsIHNlbGVjdGVkUHJvamVjdCkge1xuICAgIG1lbW9yeS5jb21wbGV0ZVRhc2tUb2dnbGUoZS50YXJnZXQuZGF0YXNldC5jb3VudGVyLCBzZWxlY3RlZFByb2plY3QpO1xuICB9O1xuXG4gIGNyZWF0ZVByb2plY3QoKTtcblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZVByb2plY3QsXG4gICAgY3JlYXRlVGFzayxcbiAgICBkZWxldGVUYXNrLFxuICAgIG1vZGlmeVByb2plY3QsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgZGVsZXRlUHJvamVjdCxcbiAgICBtb2RpZnlUYXNrLFxuICAgIHRhc2tDb21wbGV0ZSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IGNvbnRyb2wgfTtcbiIsIi8vIE1FTU9SWSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmxldCBtZW1vcnkgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgcHJvamVjdHMgPSBbXTtcblxuICBsZXQgYWRkUHJvamVjdCA9IGZ1bmN0aW9uIChwcm9qZWN0KSB7XG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICBkYXRhYmFzZS5jcmVhdGVKU09OKCk7XG4gICAgcmV0dXJuIGdldFByb2plY3RDb3VudGVyKCk7XG4gIH07XG5cbiAgbGV0IGFkZFRhc2sgPSBmdW5jdGlvbiAoaW5kZXhQcm9qZWN0LCB0YXNrKSB7XG4gICAgcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5hZGRUYXNrKHRhc2spO1xuICAgIGRhdGFiYXNlLmNyZWF0ZUpTT04oKTtcbiAgICByZXR1cm4gZ2V0VGFza0NvdW50ZXIoaW5kZXhQcm9qZWN0KTtcbiAgfTtcblxuICBsZXQgZ2V0UHJvamVjdENvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb2plY3RzLmxlbmd0aDtcbiAgfTtcblxuICBsZXQgZ2V0VGFza0NvdW50ZXIgPSBmdW5jdGlvbiAoaW5kZXhQcm9qZWN0KSB7XG4gICAgcmV0dXJuIHByb2plY3RzW2luZGV4UHJvamVjdF0ucHJvamVjdC50YXNrcy5sZW5ndGg7XG4gIH07XG5cbiAgbGV0IGdldFByb2plY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFsuLi5wcm9qZWN0c107XG4gIH07XG5cbiAgbGV0IGRlbGV0ZVRhc2sgPSBmdW5jdGlvbiAoaW5kZXhUYXNrLCBpbmRleFByb2plY3QpIHtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3Muc3BsaWNlKGluZGV4VGFzaywgMSk7XG4gICAgZGF0YWJhc2UuY3JlYXRlSlNPTigpO1xuICAgIHJldHVybiBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3MubGVuZ3RoO1xuICB9O1xuXG4gIGxldCBlZGl0UHJvamVjdCA9IGZ1bmN0aW9uIChpbmRleFByb2plY3QsIHRpdGxlKSB7XG4gICAgcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRpdGxlID0gdGl0bGU7XG4gICAgZGF0YWJhc2UuY3JlYXRlSlNPTigpO1xuICB9O1xuXG4gIGxldCBlZGl0VGFzayA9IGZ1bmN0aW9uIChpbmRleFRhc2ssIGluZGV4UHJvamVjdCwgdGl0bGUsIHRhc2tEYXRlKSB7XG4gICAgcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzW2luZGV4VGFza10udGl0bGUgPSB0aXRsZTtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3NbaW5kZXhUYXNrXS5kdWVEYXRlID0gdGFza0RhdGU7XG4gICAgZGF0YWJhc2UuY3JlYXRlSlNPTigpO1xuICB9O1xuXG4gIGxldCBjb21wbGV0ZVRhc2tUb2dnbGUgPSBmdW5jdGlvbiAoaW5kZXhUYXNrLCBpbmRleFByb2plY3QpIHtcbiAgICBpZiAocHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzW2luZGV4VGFza10uZG9uZSkge1xuICAgICAgcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzW2luZGV4VGFza10uZG9uZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3NbaW5kZXhUYXNrXS5kb25lID0gdHJ1ZTtcbiAgICB9XG4gICAgZGF0YWJhc2UuY3JlYXRlSlNPTigpO1xuICB9O1xuXG4gIGxldCBkZWxldGVQcm9qZWN0ID0gZnVuY3Rpb24gKGluZGV4UHJvamVjdCkge1xuICAgIHByb2plY3RzLnNwbGljZShpbmRleFByb2plY3QsIDEpO1xuICAgIGRhdGFiYXNlLmNyZWF0ZUpTT04oKTtcbiAgICByZXR1cm4gcHJvamVjdHMubGVuZ3RoO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYWRkUHJvamVjdCxcbiAgICBhZGRUYXNrLFxuICAgIGdldFByb2plY3RDb3VudGVyLFxuICAgIGdldFRhc2tDb3VudGVyLFxuICAgIGdldFByb2plY3QsXG4gICAgZWRpdFByb2plY3QsXG4gICAgZWRpdFRhc2ssXG4gICAgZGVsZXRlVGFzayxcbiAgICBkZWxldGVQcm9qZWN0LFxuICAgIGNvbXBsZXRlVGFza1RvZ2dsZSxcbiAgfTtcbn0pKCk7XG5cbi8vIERBVEFCQVNFIE1PRFVMRSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmxldCBkYXRhYmFzZSA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBtZW1vcnlvYmogPSB7XG4gICAgcHJvamVjdHM6IFt7XG4gICAgICAgIG5hbWUgOiAncHJvamVjdDEnLFxuICAgICAgICB0YXNrczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICd0YXNrMScsXG4gICAgICAgICAgICBkdWVEYXRlOiBcIlwiLFxuICAgICAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAndGFzazInLFxuICAgICAgICAgICAgZHVlRGF0ZTogXCJcIixcbiAgICAgICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZSA6ICdwcm9qZWN0MicsXG4gICAgICAgIHRhc2tzOiBbICAgICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAndGFzazEnLFxuICAgICAgICAgIGR1ZURhdGU6IFwiXCIsXG4gICAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAndGFzazInLFxuICAgICAgICAgIGR1ZURhdGU6IFwiXCIsXG4gICAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICAgIH1dXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lIDogJ3Byb2plY3QxJyxcbiAgICAgICAgdGFza3M6IFtdXG4gICAgICB9XG4gICAgICBdXG4gICAgfTtcblxuICBsZXQgY3JlYXRlSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IGFycmF5ID0gbWVtb3J5LmdldFByb2plY3QoKTtcbiAgLy8gYXJyYXkuZm9yRWFjaCgoZWxlbSkgPT4gKVxuICBjb25zb2xlLmRpcihKU09OLnN0cmluZ2lmeShzdHJpbmdKU09OKSlcbiAgY29uc29sZS5kaXIoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzdHJpbmdKU09OKSkpXG4gIH1cblxuICBsZXQgd3JpdGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJtYWluXCIsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICB9O1xuXG4gIGxldCByZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibWFpblwiKSk7XG4gIH07XG5cbiAgbGV0IHJlc2V0ID0gZnVuY3Rpb24gKCkge307XG5cbiAgcmV0dXJuIHtcbiAgICB3cml0ZSxcbiAgICByZWFkLFxuICAgIHJlc2V0LFxuICAgIGNyZWF0ZUpTT04sXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBtZW1vcnksIGRhdGFiYXNlIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbXBhcmVBc2MsIGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IGNvbnRyb2wgfSBmcm9tIFwiLi9sb2dpY1wiXG5pbXBvcnQgeyBtZW1vcnkgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5pbXBvcnQgeyBkaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiXG5cblxud2luZG93LmNvbnRyb2wgPSBjb250cm9sO1xud2luZG93Lm1lbW9yeSA9IG1lbW9yeTtcblxuZGlzcGxheS5yZWZyZXNoKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=