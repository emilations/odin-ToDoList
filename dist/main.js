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
    
    let tasks = document.querySelectorAll(".task-data");
    tasks[index].addEventListener("click", function (e) {
        if (e.target.id == "deleteTask") {
          deleteTask(e.target.dataset.counter);
        } else if (e.target.id == "task-complete") {
          taskComplete(e);
          refresh();
        } else {
          return;
        }
      })
    
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
        let taskDate = document.querySelector("#task-date-input").value;
        _logic__WEBPACK_IMPORTED_MODULE_1__.control.modifyTask(index, selectedProject, newName, taskDate);
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
    deleteIcon.src = "./assets/icons8-trash-96-nonactive.svg";
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
    deleteIcon.src = "./assets/icons8-trash-96-active.svg";
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
    checkmarkIcon.setAttribute("id", "task-complete")
    checkmarkIcon.setAttribute("data-counter", index);
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

  if (!_storage__WEBPACK_IMPORTED_MODULE_1__.memory.checkIfStorage()){
    createProject();
  } else {
    _storage__WEBPACK_IMPORTED_MODULE_1__.memory.retrieveFromStorage();
  }

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
/* harmony export */   "memory": () => (/* binding */ memory)
/* harmony export */ });


// MEMORY ---------------------------------------------------------------------
let memory = (function () {
  let projects = [];

  let addProject = function (project) {
    projects.push(project);
    saveToStorage();
    return getProjectCounter();
  };

  let addTask = function (indexProject, task) {
    projects[indexProject].addTask(task);
    saveToStorage();
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
    saveToStorage();
    return projects[indexProject].project.tasks.length;
  };

  let editProject = function (indexProject, title) {
    projects[indexProject].project.title = title;
    saveToStorage();
  };

  let editTask = function (indexTask, indexProject, title, taskDate) {
    projects[indexProject].project.tasks[indexTask].title = title;
    projects[indexProject].project.tasks[indexTask].dueDate = taskDate;
    saveToStorage();
  };

  let completeTaskToggle = function (indexTask, indexProject) {
    if (projects[indexProject].project.tasks[indexTask].done) {
      projects[indexProject].project.tasks[indexTask].done = false;
    } else {
      projects[indexProject].project.tasks[indexTask].done = true;
    }
    saveToStorage();
  };

  let deleteProject = function (indexProject) {
    projects.splice(indexProject, 1);
    saveToStorage();
    return projects.length;
  };

  function clear(){
    projects = [];
  }

  function saveToStorage(){
    database.set(getProject());
  }

  function retrieveFromStorage(){
    let temp = database.read();
    temp.forEach((elem) => elem.addTask = function (newTask) {
      this.project.tasks.push(newTask)
    },)
    projects =  [...temp];
  }

  function checkIfStorage(){
    return database.read()
  }

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
    retrieveFromStorage,
    checkIfStorage,
  };
})();

// DATABASE MODULE ------------------------------------------------------------
let database = (function () {

  function set(obj) {
    localStorage.setItem("main", JSON.stringify(obj));
  };

  function read() {
    return JSON.parse(localStorage.getItem("main"));
  };

  return {
    set,
    read,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTRDO0FBQ1Y7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLHVEQUFtQjtBQUN6QztBQUNBO0FBQ0EsUUFBUSw2REFBbUI7QUFDM0I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSx1REFBbUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFtQjtBQUN0QztBQUNBLGtCQUFrQiwwREFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTs7QUFFQTtBQUNBLElBQUkseURBQXFCO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHNEQUFrQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLHNEQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IseURBQXFCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdFQUF3RSxNQUFNO0FBQzlFO0FBQ0E7QUFDQSxnQkFBZ0IsNkRBQW1CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSx5RkFBeUYsTUFBTTtBQUMvRjtBQUNBO0FBQ0E7QUFDQSxNQUFNLHNEQUFrQjtBQUN4QjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFrQjtBQUMxQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxNQUFNO0FBQzVDO0FBQ0E7QUFDQSxnQkFBZ0IsZ0VBQXNCO0FBQ3RDOztBQUVBO0FBQ0Esc0RBQXNELE1BQU07QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsTUFBTSx5REFBcUI7QUFDM0I7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFFBQVEseURBQXFCO0FBQzdCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxJQUFJLHdEQUFvQjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVrQjs7Ozs7Ozs7Ozs7Ozs7OztBQzVObkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1SnlEO0FBQ3ZCOztBQUVuQztBQUNBO0FBQ0EscUJBQXFCLDBEQUFjO0FBQ25DLGtCQUFrQix1REFBaUI7QUFDbkM7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBLGtCQUFrQix1REFBVztBQUM3QixrQkFBa0Isb0RBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLHVEQUFpQjtBQUM1Qjs7QUFFQTtBQUNBLElBQUksd0RBQWtCO0FBQ3RCOztBQUVBO0FBQ0EsSUFBSSxxREFBZTtBQUNuQjs7QUFFQTtBQUNBLFdBQVcsdURBQWlCO0FBQzVCOztBQUVBO0FBQ0EsV0FBVywwREFBb0I7QUFDL0I7O0FBRUE7QUFDQSxJQUFJLCtEQUF5QjtBQUM3Qjs7QUFFQSxPQUFPLDJEQUFxQjtBQUM1QjtBQUNBLElBQUk7QUFDSixJQUFJLGdFQUEwQjtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRWtCOzs7Ozs7Ozs7Ozs7Ozs7QUM5RFk7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFaUI7Ozs7Ozs7VUNuSGxCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ044QztBQUNiO0FBQ0U7QUFDQTs7O0FBR25DLGlCQUFpQiwyQ0FBTztBQUN4QixnQkFBZ0IsNENBQU07O0FBRXRCLHFEQUFlLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0Ly4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9mYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9odG1sQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sQ3JlYXRvciB9IGZyb20gXCIuL2h0bWxDcmVhdG9yXCI7XG5pbXBvcnQgeyBjb250cm9sIH0gZnJvbSBcIi4vbG9naWNcIjtcblxubGV0IGRpc3BsYXkgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgcHJvamVjdEFkZEJ1dHRvbjtcbiAgbGV0IHRhc2tBZGRCdXR0b247XG4gIGxldCBwcm9qZWN0Q29udGFpbmVyO1xuICBsZXQgdGFza0NvbnRhaW5lcjtcbiAgbGV0IHNlbGVjdGVkUHJvamVjdCA9IDA7XG4gIGxldCBzZWxlY3RlZFRhc2sgPSAwO1xuXG4gIGZ1bmN0aW9uIGNhY2hlRE9NKCkge1xuICAgIHByb2plY3RBZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtYWRkXCIpO1xuICAgIHRhc2tBZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stYWRkXCIpO1xuICAgIHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3Qtc2VsZWN0b3JcIik7XG4gICAgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1zZWxlY3RvclwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1dHRvbkxpc3RlbmVyKCkge1xuICAgIHByb2plY3RBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZVByb2plY3QpO1xuICAgIHRhc2tBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZVRhc2spO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9wdWxhdGVQcm9qZWN0cygpIHtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbGV0IHByb2plY3RMaXN0ID0gY29udHJvbC5nZXRQcm9qZWN0cygpO1xuICAgIHByb2plY3RMaXN0LmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBodG1sQ3JlYXRvci5wcm9qZWN0KGluZGV4LCBlbGVtLnByb2plY3QudGl0bGUpXG4gICAgICApO1xuICAgIH0pO1xuICAgIGxldCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtZGF0YVwiKVtzZWxlY3RlZFByb2plY3RdO1xuICAgIGlmICghYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGFjdGl2ZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1lbnRyeS1hY3RpdmVcIik7XG4gICAgYWN0aXZlLmNoaWxkTm9kZXNbMV0uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtZWRpdC05Ni1hY3RpdmUucG5nXCI7XG4gICAgYWN0aXZlLmNoaWxkTm9kZXNbMl0uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtdHJhc2gtOTYtYWN0aXZlLnN2Z1wiO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9wdWxhdGVUYXNrcygpIHtcbiAgICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgaWYgKGNvbnRyb2wuZ2V0UHJvamVjdHMoKS5sZW5ndGggPT0gMCkge1xuICAgICAgc2VsZWN0ZWRQcm9qZWN0ID0gMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHRhc2tMaXN0ID0gY29udHJvbC5nZXRQcm9qZWN0cygpW3NlbGVjdGVkUHJvamVjdF0ucHJvamVjdC50YXNrcztcbiAgICB0YXNrTGlzdC5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGVudHJ5ID0gaHRtbENyZWF0b3IudGFzayhpbmRleCwgZWxlbS50aXRsZSwgZWxlbS5kdWVEYXRlKTtcbiAgICAgIGlmIChlbGVtLmRvbmUpIHtcbiAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZChcInRhc2stY29tcGxldGVkXCIpXG4gICAgICAgIGVudHJ5LmNoaWxkTm9kZXNbMF0uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtY2hlY2ttYXJrX2NoZWNrZWQtOTYucG5nXCI7XG4gICAgICAgIGVudHJ5LmNoaWxkTm9kZXNbM10uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtZWRpdC05Ni5wbmdcIjtcbiAgICAgICAgZW50cnkuY2hpbGROb2Rlc1s0XS5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC10cmFzaC05Ni1ub25hY3RpdmUuc3ZnXCI7XG4gICAgICB9XG4gICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGVudHJ5KTtcbiAgICB9KTtcbiAgICBsZXQgYWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLWRhdGFcIilbc2VsZWN0ZWRUYXNrXTtcbiAgICBpZiAoIWFjdGl2ZSkge3JldHVybn1cbiAgICBhY3RpdmUuY2xhc3NMaXN0LmFkZChcInRhc2stZW50cnktYWN0aXZlXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdChlKSB7XG4gICAgY29udHJvbC5jcmVhdGVQcm9qZWN0KCk7XG4gICAgcmVmcmVzaCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVGFzayhlKSB7XG4gICAgY29udHJvbC5jcmVhdGVUYXNrKHNlbGVjdGVkUHJvamVjdCk7XG4gICAgcmVmcmVzaCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuUHJvamVjdCgpIHtcbiAgICBsZXQgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtZGF0YVwiKTtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChlbGVtKSA9PlxuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09IFwiZGVsZXRlUHJvamVjdFwiKSB7XG4gICAgICAgICAgZGVsZXRlUHJvamVjdChlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmlkID09IFwiZWRpdFByb2plY3RcIikge1xuICAgICAgICAgIHByb2plY3RBY3RpdmUoZS50YXJnZXQuZGF0YXNldC5jb3VudGVyKTtcbiAgICAgICAgICBsaXN0ZW5Qcm9qZWN0VGl0bGVNb2QoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvamVjdEFjdGl2ZShlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5UYXNrKCkge1xuICAgIGxldCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzay1kYXRhXCIpO1xuICAgIHRhc2tzLmZvckVhY2goKGVsZW0pID0+XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT0gXCJkZWxldGVUYXNrXCIpIHtcbiAgICAgICAgICBkZWxldGVUYXNrKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcik7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaWQgPT0gXCJlZGl0VGFza1wiKSB7XG4gICAgICAgICAgdGFza0FjdGl2ZShlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIpO1xuICAgICAgICAgIGxpc3RlblRhc2tNb2QoZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaWQgPT0gXCJ0YXNrLWNvbXBsZXRlXCIpIHtcbiAgICAgICAgICB0YXNrQWN0aXZlKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcik7XG4gICAgICAgICAgdGFza0NvbXBsZXRlKGUpO1xuICAgICAgICAgIHJlZnJlc2goKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrQWN0aXZlKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRhc2tBY3RpdmUoY291bnRlcikge1xuICAgIHNlbGVjdGVkVGFzayA9IGNvdW50ZXI7XG4gICAgcmVmcmVzaCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvamVjdEFjdGl2ZShjb3VudGVyKSB7XG4gICAgc2VsZWN0ZWRQcm9qZWN0ID0gY291bnRlcjtcbiAgICByZWZyZXNoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVUYXNrKHRhc2tDb3VudGVyKSB7XG4gICAgbGV0IG5ld1NpemUgPSBjb250cm9sLmRlbGV0ZVRhc2sodGFza0NvdW50ZXIsIHNlbGVjdGVkUHJvamVjdCkgLSAxO1xuICAgIGNvbnNvbGUubG9nKG5ld1NpemUpO1xuICAgIGlmIChzZWxlY3RlZFRhc2sgPiBuZXdTaXplKSB7XG4gICAgICBzZWxlY3RlZFRhc2sgPSBzZWxlY3RlZFRhc2sgLSAxO1xuICAgIH1cbiAgICByZWZyZXNoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVQcm9qZWN0KGNvdW50ZXIpIHtcbiAgICBsZXQgbmV3U2l6ZSA9IGNvbnRyb2wuZGVsZXRlUHJvamVjdChjb3VudGVyKSAtIDE7XG4gICAgaWYgKHNlbGVjdGVkUHJvamVjdCA+IG5ld1NpemUpIHtcbiAgICAgIHNlbGVjdGVkUHJvamVjdCA9IHNlbGVjdGVkUHJvamVjdCAtIDE7XG4gICAgfVxuICAgIHJlZnJlc2goKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlblRhc2tNb2QoZSkge1xuICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcjtcbiAgICBsZXQgdGFza0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRhc2stZW50cnlbZGF0YS1jb3VudGVyPVwiJHtpbmRleH1cIl1gKTtcbiAgICBsZXQgdGFza05hbWUgPSB0YXNrRW50cnkuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudDtcbiAgICBsZXQgdGFza0RhdGUgPSB0YXNrRW50cnkuY2hpbGROb2Rlc1syXS50ZXh0Q29udGVudDtcbiAgICBsZXQgaW5wdXQgPSBodG1sQ3JlYXRvci50YXNrTW9kKGluZGV4LCB0YXNrTmFtZSwgdGFza0RhdGUpO1xuICAgIHRhc2tFbnRyeS5yZXBsYWNlV2l0aChpbnB1dCk7XG4gICAgXG4gICAgbGV0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLWRhdGFcIik7XG4gICAgdGFza3NbaW5kZXhdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT0gXCJkZWxldGVUYXNrXCIpIHtcbiAgICAgICAgICBkZWxldGVUYXNrKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcik7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaWQgPT0gXCJ0YXNrLWNvbXBsZXRlXCIpIHtcbiAgICAgICAgICB0YXNrQ29tcGxldGUoZSk7XG4gICAgICAgICAgcmVmcmVzaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICBcbiAgICBsZXQgZG9uZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtpZD1cImRvbmVNb2RpZmljYXRpb25UYXNrXCJdW2RhdGEtY291bnRlcj1cIiR7aW5kZXh9XCJdYCk7XG4gICAgZG9uZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGxldCBuZXdOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC10YXNrLW5hbWVcIikudmFsdWU7XG4gICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGF0ZS1pbnB1dFwiKS52YWx1ZTtcbiAgICAgIGNvbnRyb2wubW9kaWZ5VGFzayhpbmRleCwgc2VsZWN0ZWRQcm9qZWN0LCBuZXdOYW1lLCB0YXNrRGF0ZSk7XG4gICAgICByZWZyZXNoKCk7XG4gICAgfSk7XG5cbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgIGxldCBuZXdOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC10YXNrLW5hbWVcIikudmFsdWU7XG4gICAgICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlLWlucHV0XCIpLnZhbHVlO1xuICAgICAgICBjb250cm9sLm1vZGlmeVRhc2soaW5kZXgsIHNlbGVjdGVkUHJvamVjdCwgbmV3TmFtZSwgdGFza0RhdGUpO1xuICAgICAgICByZWZyZXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5Qcm9qZWN0VGl0bGVNb2QoZSkge1xuICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcjtcbiAgICBsZXQgcHJvamVjdEVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAucHJvamVjdC1lbnRyeVtkYXRhLWNvdW50ZXI9XCIke2luZGV4fVwiXWBcbiAgICApO1xuICAgIGxldCBwcm9qZWN0TmFtZSA9IHByb2plY3RFbnRyeS5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50O1xuICAgIGxldCBpbnB1dCA9IGh0bWxDcmVhdG9yLnByb2plY3RNb2QoaW5kZXgsIHByb2plY3ROYW1lKTtcbiAgICBwcm9qZWN0RW50cnkucmVwbGFjZVdpdGgoaW5wdXQpO1xuXG4gICAgbGV0IGRvbmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtpZD1cImRvbmVNb2RpZmljYXRpb25Qcm9qZWN0XCJdW2RhdGEtY291bnRlcj1cIiR7aW5kZXh9XCJdYFxuICAgICk7XG4gICAgZG9uZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGxldCBuZXdOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC1wcm9qZWN0LW5hbWVcIikudmFsdWU7XG4gICAgICBjb250cm9sLm1vZGlmeVByb2plY3QoaW5kZXgsIG5ld05hbWUpO1xuICAgICAgcmVmcmVzaCgpO1xuICAgIH0pO1xuXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICBsZXQgbmV3TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXQtcHJvamVjdC1uYW1lXCIpLnZhbHVlO1xuICAgICAgICBjb250cm9sLm1vZGlmeVByb2plY3QoaW5kZXgsIG5ld05hbWUpO1xuICAgICAgICByZWZyZXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB0YXNrQ29tcGxldGUoZSkge1xuICAgIGNvbnRyb2wudGFza0NvbXBsZXRlKGUsIHNlbGVjdGVkUHJvamVjdCk7XG4gIH1cblxuICBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgIGNhY2hlRE9NKCk7XG4gICAgYnV0dG9uTGlzdGVuZXIoKTtcbiAgICBwb3B1bGF0ZVByb2plY3RzKCk7XG4gICAgcG9wdWxhdGVUYXNrcygpO1xuICAgIGxpc3RlblByb2plY3QoKTtcbiAgICBsaXN0ZW5UYXNrKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNhY2hlRE9NLFxuICAgIGJ1dHRvbkxpc3RlbmVyLFxuICAgIHJlZnJlc2gsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBkaXNwbGF5IH07XG4iLCIvLyBQUk9KRUNUIEZBQ1RPUlkgRlVOQ1RJT04gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgcHJvamVjdEZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0OiB7XG4gICAgICB0aXRsZSxcbiAgICAgIHRhc2tzOiBbXSxcbiAgICB9LFxuICAgIGFkZFRhc2s6IGZ1bmN0aW9uIChuZXdUYXNrKSB7XG4gICAgICB0aGlzLnByb2plY3QudGFza3MucHVzaChuZXdUYXNrKVxuICAgIH0sXG4gIH07XG59O1xuXG4vLyBUQVNLIEZBQ1RPUlkgRlVOQ1RJT04tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgdGFza0ZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgICBkdWVEYXRlOiBcIlwiLFxuICAgIGRvbmU6IGZhbHNlLFxuICB9Oztcbn07XG5cbmV4cG9ydCB7IHByb2plY3RGYWN0b3J5LCB0YXNrRmFjdG9yeSB9IiwiLy8gQ1JFQVRFIFRIRSBIVE1MIEZPUiBUSEUgUFJPSkVDVCBFTlRSWSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IGh0bWxDcmVhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHByb2plY3QgPSBmdW5jdGlvbiAoaW5kZXgsIHRpdGxlKSB7XG4gICAgbGV0IHByb2plY3RFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdEVudHJ5LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVudHJ5XCIsIFwicHJvamVjdC1kYXRhXCIpO1xuICAgIHByb2plY3RFbnRyeS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuXG4gICAgbGV0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgIHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XG4gICAgcHJvamVjdE5hbWUuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcblxuICAgIGxldCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJlZGl0UHJvamVjdFwiKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1lZGl0LTk2LnBuZ1wiO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZWRpdEljb24uYWx0ID0gXCJFZGl0IEljb25cIjtcblxuICAgIGxldCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGVsZXRlUHJvamVjdFwiKTtcbiAgICBkZWxldGVJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LXRyYXNoLTk2LW5vbmFjdGl2ZS5zdmdcIjtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZGVsZXRlSWNvbi5hbHQgPSBcImRlbGV0ZSBJY29uXCI7XG5cbiAgICBwcm9qZWN0RW50cnkuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuICAgIHByb2plY3RFbnRyeS5hcHBlbmRDaGlsZChlZGl0SWNvbik7XG4gICAgcHJvamVjdEVudHJ5LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuXG4gICAgcmV0dXJuIHByb2plY3RFbnRyeTtcbiAgfTtcblxuICAvLyBDUkVBVEUgVEhFIEhUTUwgRk9SIFRIRSBQUk9KRUNUIEVOVFJZIE1PRElGSUNBVElPTlxuXG4gIGxldCBwcm9qZWN0TW9kID0gZnVuY3Rpb24gKGluZGV4LCB0aXRsZSkge1xuICAgIGxldCBwcm9qZWN0RW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RFbnRyeS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1lbnRyeVwiLCBcInByb2plY3QtZGF0YVwiLCBcInByb2plY3QtZW50cnktYWN0aXZlXCIpO1xuICAgIHByb2plY3RFbnRyeS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuXG4gICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1wcm9qZWN0LW5hbWVcIilcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICBpbnB1dC52YWx1ZSA9IHRpdGxlO1xuXG4gICAgbGV0IGRvbmVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkb25lSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRvbmVNb2RpZmljYXRpb25Qcm9qZWN0XCIpO1xuICAgIGRvbmVJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWRvbmUtOTYucG5nXCI7XG4gICAgZG9uZUljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBkb25lSWNvbi5hbHQgPSBcIkRvbmUgSWNvblwiO1xuXG4gICAgbGV0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkZWxldGVQcm9qZWN0XCIpO1xuICAgIGRlbGV0ZUljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtdHJhc2gtOTYtYWN0aXZlLnN2Z1wiO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBkZWxldGVJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIHByb2plY3RFbnRyeS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgcHJvamVjdEVudHJ5LmFwcGVuZENoaWxkKGRvbmVJY29uKTtcbiAgICBwcm9qZWN0RW50cnkuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG5cbiAgICByZXR1cm4gcHJvamVjdEVudHJ5O1xuICB9O1xuXG4gIC8vIENSRUFURSBUSEUgSFRNTCBGT1IgVEhFIFRBU0sgRU5UUlkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgbGV0IHRhc2sgPSBmdW5jdGlvbiAoaW5kZXgsIHRpdGxlLCBkYXRlKSB7XG4gICAgbGV0IHRhc2tFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza0VudHJ5LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWVudHJ5XCIsIFwidGFzay1kYXRhXCIpO1xuICAgIHRhc2tFbnRyeS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuXG4gICAgbGV0IGNoZWNrbWFya0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGNoZWNrbWFya0ljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtY2hlY2ttYXJrX3VuY2hlY2tlZC05Ni5wbmdcIjtcbiAgICBjaGVja21hcmtJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwidGFzay1jb21wbGV0ZVwiKVxuICAgIGNoZWNrbWFya0ljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBjaGVja21hcmtJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIGxldCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICB0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKFwidGFzay1uYW1lXCIpO1xuICAgIHRhc2tOYW1lLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG5cbiAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICB0YXNrRGF0ZS50ZXh0Q29udGVudCA9IGRhdGU7XG4gICAgdGFza0RhdGUuY2xhc3NMaXN0LmFkZCgndGFzay1kYXRlJylcbiAgICB0YXNrRGF0ZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRhc2stZGF0ZVwiKTtcblxuICAgIGxldCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJlZGl0VGFza1wiKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1lZGl0LTk2LWFjdGl2ZS5wbmdcIjtcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGVkaXRJY29uLmFsdCA9IFwiRWRpdCBJY29uXCI7XG5cbiAgICBsZXQgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRlbGV0ZVRhc2tcIik7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGRlbGV0ZUljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtdHJhc2gtOTYtYWN0aXZlLnN2Z1wiO1xuICAgIGRlbGV0ZUljb24uYWx0ID0gXCJkZWxldGUgSWNvblwiO1xuXG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGNoZWNrbWFya0ljb24pO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZCh0YXNrTmFtZSk7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKHRhc2tEYXRlKTtcbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcblxuICAgIHJldHVybiB0YXNrRW50cnk7XG4gIH07XG5cbiAgbGV0IHRhc2tNb2QgPSBmdW5jdGlvbiAoaW5kZXgsIHRpdGxlLCBkYXRlKSB7XG4gICAgbGV0IHRhc2tFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza0VudHJ5LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWVudHJ5XCIsIFwidGFzay1kYXRhXCIsIFwidGFzay1lbnRyeS1hY3RpdmVcIik7XG4gICAgdGFza0VudHJ5LnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG5cbiAgICBsZXQgY2hlY2ttYXJrSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgY2hlY2ttYXJrSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRhc2stY29tcGxldGVcIilcbiAgICBjaGVja21hcmtJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgY2hlY2ttYXJrSWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1jaGVja21hcmtfdW5jaGVja2VkLTk2LnBuZ1wiO1xuICAgIGNoZWNrbWFya0ljb24uYWx0ID0gXCJkZWxldGUgSWNvblwiO1xuXG4gICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJpbnB1dC10YXNrLW5hbWVcIilcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICBpbnB1dC52YWx1ZSA9IHRpdGxlO1xuXG4gICAgbGV0IHRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHRhc2tEYXRlLnR5cGUgPSBcImRhdGVcIjtcbiAgICB0YXNrRGF0ZS52YWx1ZSA9IGRhdGU7XG4gICAgdGFza0RhdGUuY2xhc3NMaXN0LmFkZChcInRhc2stZGF0ZVwiKTtcbiAgICB0YXNrRGF0ZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRhc2stZGF0ZS1pbnB1dFwiKTtcblxuICAgIGxldCBkb25lSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZG9uZUljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkb25lTW9kaWZpY2F0aW9uVGFza1wiKTtcbiAgICBkb25lSWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1kb25lLTk2LnBuZ1wiO1xuICAgIGRvbmVJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZG9uZUljb24uYWx0ID0gXCJEb25lIEljb25cIjtcblxuICAgIGxldCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGVsZXRlVGFza1wiKTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZGVsZXRlSWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC10cmFzaC05Ni1hY3RpdmUuc3ZnXCI7XG4gICAgZGVsZXRlSWNvbi5hbHQgPSBcImRlbGV0ZSBJY29uXCI7XG5cbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQoY2hlY2ttYXJrSWNvbik7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZChkb25lSWNvbik7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuXG4gICAgcmV0dXJuIHRhc2tFbnRyeTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHByb2plY3QsXG4gICAgcHJvamVjdE1vZCxcbiAgICB0YXNrLFxuICAgIHRhc2tNb2QsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBodG1sQ3JlYXRvciB9OyIsImltcG9ydCB7IHByb2plY3RGYWN0b3J5LCB0YXNrRmFjdG9yeSB9IGZyb20gXCIuL2ZhY3Rvcmllc1wiO1xuaW1wb3J0IHsgbWVtb3J5IH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5sZXQgY29udHJvbCA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBjcmVhdGVQcm9qZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBuZXdQcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkoKTtcbiAgICBsZXQgY291bnRlciA9IG1lbW9yeS5hZGRQcm9qZWN0KG5ld1Byb2plY3QpIC0gMTtcbiAgICBsZXQgcHJvamVjdE5hbWUgPSBgTmV3IHByb2plY3RgO1xuICAgIG1vZGlmeVByb2plY3QoY291bnRlciwgcHJvamVjdE5hbWUpO1xuICAgIHJldHVybiBjb3VudGVyOyAvL3JldHVybnMgbmV3IHByb2plY3QgaW5kZXhcbiAgfTtcblxuICBsZXQgY3JlYXRlVGFzayA9IGZ1bmN0aW9uIChpbmRleFByb2plY3QpIHtcbiAgICBsZXQgbmV3VGFzayA9IHRhc2tGYWN0b3J5KCk7XG4gICAgbGV0IGNvdW50ZXIgPSBtZW1vcnkuYWRkVGFzayhpbmRleFByb2plY3QsIG5ld1Rhc2spIC0gMTtcbiAgICBsZXQgdGFza05hbWUgPSBgTmV3IHRhc2tgO1xuICAgIG1vZGlmeVRhc2soY291bnRlciwgaW5kZXhQcm9qZWN0LCB0YXNrTmFtZSk7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG5cbiAgbGV0IGRlbGV0ZVRhc2sgPSBmdW5jdGlvbiAoaW5kZXhUYXNrLCBpbmRleFByb2plY3QpIHtcbiAgICByZXR1cm4gbWVtb3J5LmRlbGV0ZVRhc2soaW5kZXhUYXNrLCBpbmRleFByb2plY3QpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1vZGlmeVByb2plY3QoaW5kZXhQcm9qZWN0LCB0aXRsZSkge1xuICAgIG1lbW9yeS5lZGl0UHJvamVjdChpbmRleFByb2plY3QsIHRpdGxlKTtcbiAgfTtcblxuICBmdW5jdGlvbiBtb2RpZnlUYXNrKGNvdW50ZXIsIGluZGV4UHJvamVjdCwgdGFza05hbWUsIHRhc2tEYXRlKSB7XG4gICAgbWVtb3J5LmVkaXRUYXNrKGNvdW50ZXIsIGluZGV4UHJvamVjdCwgdGFza05hbWUsIHRhc2tEYXRlKTtcbiAgfTtcblxuICBsZXQgZ2V0UHJvamVjdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG1lbW9yeS5nZXRQcm9qZWN0KCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gZGVsZXRlUHJvamVjdChpbmRleFByb2plY3QpIHtcbiAgICByZXR1cm4gbWVtb3J5LmRlbGV0ZVByb2plY3QoaW5kZXhQcm9qZWN0KTtcbiAgfTtcblxuICBmdW5jdGlvbiB0YXNrQ29tcGxldGUoZSwgc2VsZWN0ZWRQcm9qZWN0KSB7XG4gICAgbWVtb3J5LmNvbXBsZXRlVGFza1RvZ2dsZShlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIsIHNlbGVjdGVkUHJvamVjdCk7XG4gIH07XG5cbiAgaWYgKCFtZW1vcnkuY2hlY2tJZlN0b3JhZ2UoKSl7XG4gICAgY3JlYXRlUHJvamVjdCgpO1xuICB9IGVsc2Uge1xuICAgIG1lbW9yeS5yZXRyaWV2ZUZyb21TdG9yYWdlKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZVByb2plY3QsXG4gICAgY3JlYXRlVGFzayxcbiAgICBkZWxldGVUYXNrLFxuICAgIG1vZGlmeVByb2plY3QsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgZGVsZXRlUHJvamVjdCxcbiAgICBtb2RpZnlUYXNrLFxuICAgIHRhc2tDb21wbGV0ZSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IGNvbnRyb2wgfTtcbiIsImltcG9ydCB7IHNldCB9IGZyb20gXCJkYXRlLWZuc1wiO1xuXG4vLyBNRU1PUlkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgbWVtb3J5ID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHByb2plY3RzID0gW107XG5cbiAgbGV0IGFkZFByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdCkge1xuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgc2F2ZVRvU3RvcmFnZSgpO1xuICAgIHJldHVybiBnZXRQcm9qZWN0Q291bnRlcigpO1xuICB9O1xuXG4gIGxldCBhZGRUYXNrID0gZnVuY3Rpb24gKGluZGV4UHJvamVjdCwgdGFzaykge1xuICAgIHByb2plY3RzW2luZGV4UHJvamVjdF0uYWRkVGFzayh0YXNrKTtcbiAgICBzYXZlVG9TdG9yYWdlKCk7XG4gICAgcmV0dXJuIGdldFRhc2tDb3VudGVyKGluZGV4UHJvamVjdCk7XG4gIH07XG5cbiAgbGV0IGdldFByb2plY3RDb3VudGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBwcm9qZWN0cy5sZW5ndGg7XG4gIH07XG5cbiAgbGV0IGdldFRhc2tDb3VudGVyID0gZnVuY3Rpb24gKGluZGV4UHJvamVjdCkge1xuICAgIHJldHVybiBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3MubGVuZ3RoO1xuICB9O1xuXG4gIGxldCBnZXRQcm9qZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBbLi4ucHJvamVjdHNdO1xuICB9O1xuXG4gIGxldCBkZWxldGVUYXNrID0gZnVuY3Rpb24gKGluZGV4VGFzaywgaW5kZXhQcm9qZWN0KSB7XG4gICAgcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzLnNwbGljZShpbmRleFRhc2ssIDEpO1xuICAgIHNhdmVUb1N0b3JhZ2UoKTtcbiAgICByZXR1cm4gcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzLmxlbmd0aDtcbiAgfTtcblxuICBsZXQgZWRpdFByb2plY3QgPSBmdW5jdGlvbiAoaW5kZXhQcm9qZWN0LCB0aXRsZSkge1xuICAgIHByb2plY3RzW2luZGV4UHJvamVjdF0ucHJvamVjdC50aXRsZSA9IHRpdGxlO1xuICAgIHNhdmVUb1N0b3JhZ2UoKTtcbiAgfTtcblxuICBsZXQgZWRpdFRhc2sgPSBmdW5jdGlvbiAoaW5kZXhUYXNrLCBpbmRleFByb2plY3QsIHRpdGxlLCB0YXNrRGF0ZSkge1xuICAgIHByb2plY3RzW2luZGV4UHJvamVjdF0ucHJvamVjdC50YXNrc1tpbmRleFRhc2tdLnRpdGxlID0gdGl0bGU7XG4gICAgcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzW2luZGV4VGFza10uZHVlRGF0ZSA9IHRhc2tEYXRlO1xuICAgIHNhdmVUb1N0b3JhZ2UoKTtcbiAgfTtcblxuICBsZXQgY29tcGxldGVUYXNrVG9nZ2xlID0gZnVuY3Rpb24gKGluZGV4VGFzaywgaW5kZXhQcm9qZWN0KSB7XG4gICAgaWYgKHByb2plY3RzW2luZGV4UHJvamVjdF0ucHJvamVjdC50YXNrc1tpbmRleFRhc2tdLmRvbmUpIHtcbiAgICAgIHByb2plY3RzW2luZGV4UHJvamVjdF0ucHJvamVjdC50YXNrc1tpbmRleFRhc2tdLmRvbmUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzW2luZGV4VGFza10uZG9uZSA9IHRydWU7XG4gICAgfVxuICAgIHNhdmVUb1N0b3JhZ2UoKTtcbiAgfTtcblxuICBsZXQgZGVsZXRlUHJvamVjdCA9IGZ1bmN0aW9uIChpbmRleFByb2plY3QpIHtcbiAgICBwcm9qZWN0cy5zcGxpY2UoaW5kZXhQcm9qZWN0LCAxKTtcbiAgICBzYXZlVG9TdG9yYWdlKCk7XG4gICAgcmV0dXJuIHByb2plY3RzLmxlbmd0aDtcbiAgfTtcblxuICBmdW5jdGlvbiBjbGVhcigpe1xuICAgIHByb2plY3RzID0gW107XG4gIH1cblxuICBmdW5jdGlvbiBzYXZlVG9TdG9yYWdlKCl7XG4gICAgZGF0YWJhc2Uuc2V0KGdldFByb2plY3QoKSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXRyaWV2ZUZyb21TdG9yYWdlKCl7XG4gICAgbGV0IHRlbXAgPSBkYXRhYmFzZS5yZWFkKCk7XG4gICAgdGVtcC5mb3JFYWNoKChlbGVtKSA9PiBlbGVtLmFkZFRhc2sgPSBmdW5jdGlvbiAobmV3VGFzaykge1xuICAgICAgdGhpcy5wcm9qZWN0LnRhc2tzLnB1c2gobmV3VGFzaylcbiAgICB9LClcbiAgICBwcm9qZWN0cyA9ICBbLi4udGVtcF07XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0lmU3RvcmFnZSgpe1xuICAgIHJldHVybiBkYXRhYmFzZS5yZWFkKClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYWRkUHJvamVjdCxcbiAgICBhZGRUYXNrLFxuICAgIGdldFByb2plY3RDb3VudGVyLFxuICAgIGdldFRhc2tDb3VudGVyLFxuICAgIGdldFByb2plY3QsXG4gICAgZWRpdFByb2plY3QsXG4gICAgZWRpdFRhc2ssXG4gICAgZGVsZXRlVGFzayxcbiAgICBkZWxldGVQcm9qZWN0LFxuICAgIGNvbXBsZXRlVGFza1RvZ2dsZSxcbiAgICByZXRyaWV2ZUZyb21TdG9yYWdlLFxuICAgIGNoZWNrSWZTdG9yYWdlLFxuICB9O1xufSkoKTtcblxuLy8gREFUQUJBU0UgTU9EVUxFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IGRhdGFiYXNlID0gKGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBzZXQob2JqKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJtYWluXCIsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJtYWluXCIpKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNldCxcbiAgICByZWFkLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgbWVtb3J5IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbXBhcmVBc2MsIGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IGNvbnRyb2wgfSBmcm9tIFwiLi9sb2dpY1wiXG5pbXBvcnQgeyBtZW1vcnkgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5pbXBvcnQgeyBkaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiXG5cblxud2luZG93LmNvbnRyb2wgPSBjb250cm9sO1xud2luZG93Lm1lbW9yeSA9IG1lbW9yeTtcblxuZGlzcGxheS5yZWZyZXNoKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=