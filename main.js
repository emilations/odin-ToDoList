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

  function projectListen() {
    let projects = document.querySelectorAll(".project-data");
    projects.forEach((elem) =>
      elem.addEventListener("click", function (e) {
        selectedProject = e.target.dataset.counter;
        refresh();
      })
    );
  }

  function populateProjects() {
    projectContainer.innerHTML = "";
    let projectList = _logic__WEBPACK_IMPORTED_MODULE_1__.control.getProjects();
    projectList.forEach((elem, index) => {
      projectContainer.appendChild(
        _htmlCreator__WEBPACK_IMPORTED_MODULE_0__.htmlCreator.project(index, elem.project.title)
      );
    });
    document
      .querySelectorAll(".project-data")
      [selectedProject].classList.add("project-entry-active");
  }

  function deleteTaskListen() {
    let taskDeleteButtons = document.querySelectorAll("#deleteTask");
    taskDeleteButtons.forEach((elem) =>
      elem.addEventListener("click", function (e) {
        _logic__WEBPACK_IMPORTED_MODULE_1__.control.deleteTask(e.target.dataset.counter, selectedProject);
        refresh();
      })
    );
  }

  function deleteProjectListen() {
    let ProjectDeleteButtons = document.querySelectorAll("#deleteProject");
    ProjectDeleteButtons.forEach((elem) =>
      elem.addEventListener("click", function (e) {
        _logic__WEBPACK_IMPORTED_MODULE_1__.control.deleteProject(e.target.dataset.counter);
        selectedProject = 0;
        refresh();
      })
    );
  }

  function populateTasks() {
    taskContainer.innerHTML = "";
    let taskList = _logic__WEBPACK_IMPORTED_MODULE_1__.control.getProjects()[selectedProject].project.tasks;
    taskList.forEach((elem, index) => {
      taskContainer.appendChild(_htmlCreator__WEBPACK_IMPORTED_MODULE_0__.htmlCreator.task(index, elem.title));
    });
  }

  function createProject(e) {
    let indexProject = _logic__WEBPACK_IMPORTED_MODULE_1__.control.createProject();
    refresh();
  }

  function createTask(e) {
    _logic__WEBPACK_IMPORTED_MODULE_1__.control.createTask(selectedProject);
    refresh();
  }

  function listenProjectTitleMod() {
    let editIcons = document.querySelectorAll("#editProject");
    editIcons.forEach((elem) => elem.addEventListener("click", modifyTitle))
    function modifyTitle(e) {
      let projectIndex = e.target.dataset.counter;
      let newTitle ="";
      console.log("ready")
      console.log(projectIndex)
    }
  }

  function refresh() {
    cacheDOM();
    buttonListener();
    populateProjects();
    populateTasks();  
    deleteTaskListen();
    projectListen();
    deleteProjectListen();
    listenProjectTitleMod();
    console.log("refreshed")
  }

  return {
    cacheDOM,
    buttonListener,
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

  // CREATE THE HTML FOR THE TASK ENTRY -----------------------------------------
  let task = function (index, title) {
    let taskEntry = document.createElement("div");
    taskEntry.classList.add("task-entry", "task-data");
    taskEntry.setAttribute("data-counter", index);

    let checkmarkIcon = document.createElement("img");
    checkmarkIcon.src = "./assets/icons8-checkmark_unchecked-96.png";
    checkmarkIcon.alt = "delete Icon";

    let taskName = document.createElement("div");
    taskName.textContent = title;
    taskName.classList.add("project-name");
    taskName.setAttribute("data-counter", index);

    let deleteIcon = document.createElement("img");
    deleteIcon.setAttribute("id", "deleteTask");
    deleteIcon.setAttribute("data-counter", index);
    deleteIcon.src = "./assets/icons8-trash-96-nonactive.svg";
    deleteIcon.alt = "delete Icon";

    taskEntry.appendChild(checkmarkIcon);
    taskEntry.appendChild(taskName);
    taskEntry.appendChild(deleteIcon);

    return taskEntry;
  };

  return {
    project,
    task,
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
    let projectName = `New project`
    modifyProject(counter, projectName)
    return counter; //returns new project index
  };

  let createTask = function (indexProject) {
    let newTask = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.taskFactory)();
    let counter = _storage__WEBPACK_IMPORTED_MODULE_1__.memory.addTask(indexProject, newTask) - 1;
    let taskName = `New task`;
    modifyTask(counter, indexProject, taskName)
    return counter;
  };

  let deleteTask = function (indexTask, indexProject) {
    _storage__WEBPACK_IMPORTED_MODULE_1__.memory.deleteTask(indexTask, indexProject)
  };

  function modifyProject (indexProject, title) {
    _storage__WEBPACK_IMPORTED_MODULE_1__.memory.editProject(indexProject, title)
  };

  function modifyTask (counter, indexProject, taskName) {
    _storage__WEBPACK_IMPORTED_MODULE_1__.memory.editTask(counter, indexProject, taskName)
  }

  let getProjects = function () {
    return _storage__WEBPACK_IMPORTED_MODULE_1__.memory.getProject();
  };

  function deleteProject (indexProject) {
    _storage__WEBPACK_IMPORTED_MODULE_1__.memory.deleteProject(indexProject)
  }

  return {
    createProject,
    createTask,
    deleteTask,
    modifyProject,
    getProjects,
    deleteProject,
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
    return getProjectCounter()
  };

  let addTask = function (indexProject, task) {
    projects[indexProject].addTask(task)
    return getTaskCounter(indexProject)
  };

  let getProjectCounter = function () {
    return projects.length;
  };

  let getTaskCounter = function (indexProject) {
    return projects[indexProject].project.tasks.length
  };
  
  let getProject = function () {
    return [...projects];
  };

  let deleteTask = function (indexTask, indexProject) {
    projects[indexProject].project.tasks.splice(indexTask, 1)
  };

  let editProject = function (indexProject, title) {
    projects[indexProject].project.title = title;
  };

  let editTask = function (indexTask, indexProject, title) {
    projects[indexProject].project.tasks[indexTask].title = title;
  }

  let deleteProject = function (indexProject) {
    projects.splice(indexProject, 1)
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

_display__WEBPACK_IMPORTED_MODULE_2__.display.cacheDOM();
_display__WEBPACK_IMPORTED_MODULE_2__.display.buttonListener();

// -----------------------------------------------------------------------------------

// format(new Date(2014, 1, 11), 'yyyy-MM-dd')
// //=> '2014-02-11'

// const dates = [
//   new Date(1995, 6, 2),
//   new Date(1987, 1, 11),
//   new Date(1989, 6, 10),
// ]

// dates.sort(compareAsc)
// //=> [
// //   Wed Feb 11 1987 00:00:00,
// //   Mon Jul 10 1989 00:00:00,
// //   Sun Jul 02 1995 00:00:00
// // ]

// localStorage.setItem('colorSetting', '#a4509b');

// console.dir(localStorage.getItem("colorSetting"));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTRDO0FBQ1Y7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQix1REFBbUI7QUFDekM7QUFDQTtBQUNBLFFBQVEsNkRBQW1CO0FBQzNCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBa0I7QUFDMUI7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEseURBQXFCO0FBQzdCO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFtQjtBQUN0QztBQUNBLGdDQUFnQywwREFBZ0I7QUFDaEQsS0FBSztBQUNMOztBQUVBO0FBQ0EsdUJBQXVCLHlEQUFxQjtBQUM1QztBQUNBOztBQUVBO0FBQ0EsSUFBSSxzREFBa0I7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFa0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSG5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRW1DO0FBQ3ZCOztBQUVuQztBQUNBO0FBQ0EscUJBQXFCLDBEQUFjO0FBQ25DLGtCQUFrQix1REFBaUI7QUFDbkM7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjs7QUFFQTtBQUNBLGtCQUFrQix1REFBVztBQUM3QixrQkFBa0Isb0RBQWM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHVEQUFpQjtBQUNyQjs7QUFFQTtBQUNBLElBQUksd0RBQWtCO0FBQ3RCOztBQUVBO0FBQ0EsSUFBSSxxREFBZTtBQUNuQjs7QUFFQTtBQUNBLFdBQVcsdURBQWlCO0FBQzVCOztBQUVBO0FBQ0EsSUFBSSwwREFBb0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEREO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7OztVQ3hFRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDYjtBQUNFO0FBQ0E7OztBQUduQyxpQkFBaUIsMkNBQU87QUFDeEIsZ0JBQWdCLDRDQUFNOztBQUV0QixzREFBZ0I7QUFDaEIsNERBQXNCOztBQUV0Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvZmFjdG9yaWVzLmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvaHRtbENyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHRtbENyZWF0b3IgfSBmcm9tIFwiLi9odG1sQ3JlYXRvclwiO1xuaW1wb3J0IHsgY29udHJvbCB9IGZyb20gXCIuL2xvZ2ljXCI7XG5cbmxldCBkaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHByb2plY3RBZGRCdXR0b247XG4gIGxldCB0YXNrQWRkQnV0dG9uO1xuICBsZXQgcHJvamVjdENvbnRhaW5lcjtcbiAgbGV0IHRhc2tDb250YWluZXI7XG4gIGxldCBzZWxlY3RlZFByb2plY3QgPSAwO1xuXG4gIGZ1bmN0aW9uIGNhY2hlRE9NKCkge1xuICAgIHByb2plY3RBZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtYWRkXCIpO1xuICAgIHRhc2tBZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stYWRkXCIpO1xuICAgIHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3Qtc2VsZWN0b3JcIik7XG4gICAgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1zZWxlY3RvclwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1dHRvbkxpc3RlbmVyKCkge1xuICAgIHByb2plY3RBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZVByb2plY3QpO1xuICAgIHRhc2tBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZVRhc2spO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvamVjdExpc3RlbigpIHtcbiAgICBsZXQgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtZGF0YVwiKTtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChlbGVtKSA9PlxuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgc2VsZWN0ZWRQcm9qZWN0ID0gZS50YXJnZXQuZGF0YXNldC5jb3VudGVyO1xuICAgICAgICByZWZyZXNoKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBwb3B1bGF0ZVByb2plY3RzKCkge1xuICAgIHByb2plY3RDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBsZXQgcHJvamVjdExpc3QgPSBjb250cm9sLmdldFByb2plY3RzKCk7XG4gICAgcHJvamVjdExpc3QuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGh0bWxDcmVhdG9yLnByb2plY3QoaW5kZXgsIGVsZW0ucHJvamVjdC50aXRsZSlcbiAgICAgICk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtZGF0YVwiKVxuICAgICAgW3NlbGVjdGVkUHJvamVjdF0uY2xhc3NMaXN0LmFkZChcInByb2plY3QtZW50cnktYWN0aXZlXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsZXRlVGFza0xpc3RlbigpIHtcbiAgICBsZXQgdGFza0RlbGV0ZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2RlbGV0ZVRhc2tcIik7XG4gICAgdGFza0RlbGV0ZUJ1dHRvbnMuZm9yRWFjaCgoZWxlbSkgPT5cbiAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnRyb2wuZGVsZXRlVGFzayhlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIsIHNlbGVjdGVkUHJvamVjdCk7XG4gICAgICAgIHJlZnJlc2goKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVByb2plY3RMaXN0ZW4oKSB7XG4gICAgbGV0IFByb2plY3REZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNkZWxldGVQcm9qZWN0XCIpO1xuICAgIFByb2plY3REZWxldGVCdXR0b25zLmZvckVhY2goKGVsZW0pID0+XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb250cm9sLmRlbGV0ZVByb2plY3QoZS50YXJnZXQuZGF0YXNldC5jb3VudGVyKTtcbiAgICAgICAgc2VsZWN0ZWRQcm9qZWN0ID0gMDtcbiAgICAgICAgcmVmcmVzaCgpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9wdWxhdGVUYXNrcygpIHtcbiAgICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbGV0IHRhc2tMaXN0ID0gY29udHJvbC5nZXRQcm9qZWN0cygpW3NlbGVjdGVkUHJvamVjdF0ucHJvamVjdC50YXNrcztcbiAgICB0YXNrTGlzdC5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xuICAgICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChodG1sQ3JlYXRvci50YXNrKGluZGV4LCBlbGVtLnRpdGxlKSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0KGUpIHtcbiAgICBsZXQgaW5kZXhQcm9qZWN0ID0gY29udHJvbC5jcmVhdGVQcm9qZWN0KCk7XG4gICAgcmVmcmVzaCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVGFzayhlKSB7XG4gICAgY29udHJvbC5jcmVhdGVUYXNrKHNlbGVjdGVkUHJvamVjdCk7XG4gICAgcmVmcmVzaCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuUHJvamVjdFRpdGxlTW9kKCkge1xuICAgIGxldCBlZGl0SWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2VkaXRQcm9qZWN0XCIpO1xuICAgIGVkaXRJY29ucy5mb3JFYWNoKChlbGVtKSA9PiBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RpZnlUaXRsZSkpXG4gICAgZnVuY3Rpb24gbW9kaWZ5VGl0bGUoZSkge1xuICAgICAgbGV0IHByb2plY3RJbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcjtcbiAgICAgIGxldCBuZXdUaXRsZSA9XCJcIjtcbiAgICAgIGNvbnNvbGUubG9nKFwicmVhZHlcIilcbiAgICAgIGNvbnNvbGUubG9nKHByb2plY3RJbmRleClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgIGNhY2hlRE9NKCk7XG4gICAgYnV0dG9uTGlzdGVuZXIoKTtcbiAgICBwb3B1bGF0ZVByb2plY3RzKCk7XG4gICAgcG9wdWxhdGVUYXNrcygpOyAgXG4gICAgZGVsZXRlVGFza0xpc3RlbigpO1xuICAgIHByb2plY3RMaXN0ZW4oKTtcbiAgICBkZWxldGVQcm9qZWN0TGlzdGVuKCk7XG4gICAgbGlzdGVuUHJvamVjdFRpdGxlTW9kKCk7XG4gICAgY29uc29sZS5sb2coXCJyZWZyZXNoZWRcIilcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY2FjaGVET00sXG4gICAgYnV0dG9uTGlzdGVuZXIsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBkaXNwbGF5IH07XG4iLCIvLyBQUk9KRUNUIEZBQ1RPUlkgRlVOQ1RJT04gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgcHJvamVjdEZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0OiB7XG4gICAgICB0aXRsZSxcbiAgICAgIHRhc2tzOiBbXSxcbiAgICB9LFxuICAgIGFkZFRhc2s6IGZ1bmN0aW9uIChuZXdUYXNrKSB7XG4gICAgICB0aGlzLnByb2plY3QudGFza3MucHVzaChuZXdUYXNrKVxuICAgIH0sXG4gIH07XG59O1xuXG4vLyBUQVNLIEZBQ1RPUlkgRlVOQ1RJT04tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgdGFza0ZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgICBkdWVEYXRlOiBcIlwiLFxuICAgIGRvbmU6IGZhbHNlLFxuICB9Oztcbn07XG5cbmV4cG9ydCB7IHByb2plY3RGYWN0b3J5LCB0YXNrRmFjdG9yeSB9IiwiLy8gQ1JFQVRFIFRIRSBIVE1MIEZPUiBUSEUgUFJPSkVDVCBFTlRSWSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IGh0bWxDcmVhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHByb2plY3QgPSBmdW5jdGlvbiAoaW5kZXgsIHRpdGxlKSB7XG4gICAgbGV0IHByb2plY3RFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdEVudHJ5LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVudHJ5XCIsIFwicHJvamVjdC1kYXRhXCIpO1xuICAgIHByb2plY3RFbnRyeS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuXG4gICAgbGV0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgIHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XG4gICAgcHJvamVjdE5hbWUuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcblxuICAgIGxldCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJlZGl0UHJvamVjdFwiKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1lZGl0LTk2LnBuZ1wiO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZWRpdEljb24uYWx0ID0gXCJFZGl0IEljb25cIjtcblxuICAgIGxldCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGVsZXRlUHJvamVjdFwiKTtcbiAgICBkZWxldGVJY29uLnNyYyA9IFwiL2Fzc2V0cy9pY29uczgtdHJhc2gtOTYtbm9uYWN0aXZlLnN2Z1wiO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBkZWxldGVJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIHByb2plY3RFbnRyeS5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG4gICAgcHJvamVjdEVudHJ5LmFwcGVuZENoaWxkKGVkaXRJY29uKTtcbiAgICBwcm9qZWN0RW50cnkuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG5cbiAgICByZXR1cm4gcHJvamVjdEVudHJ5O1xuICB9O1xuXG4gIC8vIENSRUFURSBUSEUgSFRNTCBGT1IgVEhFIFRBU0sgRU5UUlkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgbGV0IHRhc2sgPSBmdW5jdGlvbiAoaW5kZXgsIHRpdGxlKSB7XG4gICAgbGV0IHRhc2tFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza0VudHJ5LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWVudHJ5XCIsIFwidGFzay1kYXRhXCIpO1xuICAgIHRhc2tFbnRyeS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuXG4gICAgbGV0IGNoZWNrbWFya0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGNoZWNrbWFya0ljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtY2hlY2ttYXJrX3VuY2hlY2tlZC05Ni5wbmdcIjtcbiAgICBjaGVja21hcmtJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIGxldCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICB0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xuICAgIHRhc2tOYW1lLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG5cbiAgICBsZXQgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRlbGV0ZVRhc2tcIik7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGRlbGV0ZUljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtdHJhc2gtOTYtbm9uYWN0aXZlLnN2Z1wiO1xuICAgIGRlbGV0ZUljb24uYWx0ID0gXCJkZWxldGUgSWNvblwiO1xuXG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGNoZWNrbWFya0ljb24pO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZCh0YXNrTmFtZSk7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuXG4gICAgcmV0dXJuIHRhc2tFbnRyeTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHByb2plY3QsXG4gICAgdGFzayxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IGh0bWxDcmVhdG9yIH07XG4iLCJpbXBvcnQgeyBwcm9qZWN0RmFjdG9yeSwgdGFza0ZhY3RvcnkgfSBmcm9tIFwiLi9mYWN0b3JpZXNcIjtcbmltcG9ydCB7IG1lbW9yeSB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxubGV0IGNvbnRyb2wgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgY3JlYXRlUHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3RGYWN0b3J5KCk7XG4gICAgbGV0IGNvdW50ZXIgPSBtZW1vcnkuYWRkUHJvamVjdChuZXdQcm9qZWN0KSAtIDE7XG4gICAgbGV0IHByb2plY3ROYW1lID0gYE5ldyBwcm9qZWN0YFxuICAgIG1vZGlmeVByb2plY3QoY291bnRlciwgcHJvamVjdE5hbWUpXG4gICAgcmV0dXJuIGNvdW50ZXI7IC8vcmV0dXJucyBuZXcgcHJvamVjdCBpbmRleFxuICB9O1xuXG4gIGxldCBjcmVhdGVUYXNrID0gZnVuY3Rpb24gKGluZGV4UHJvamVjdCkge1xuICAgIGxldCBuZXdUYXNrID0gdGFza0ZhY3RvcnkoKTtcbiAgICBsZXQgY291bnRlciA9IG1lbW9yeS5hZGRUYXNrKGluZGV4UHJvamVjdCwgbmV3VGFzaykgLSAxO1xuICAgIGxldCB0YXNrTmFtZSA9IGBOZXcgdGFza2A7XG4gICAgbW9kaWZ5VGFzayhjb3VudGVyLCBpbmRleFByb2plY3QsIHRhc2tOYW1lKVxuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuXG4gIGxldCBkZWxldGVUYXNrID0gZnVuY3Rpb24gKGluZGV4VGFzaywgaW5kZXhQcm9qZWN0KSB7XG4gICAgbWVtb3J5LmRlbGV0ZVRhc2soaW5kZXhUYXNrLCBpbmRleFByb2plY3QpXG4gIH07XG5cbiAgZnVuY3Rpb24gbW9kaWZ5UHJvamVjdCAoaW5kZXhQcm9qZWN0LCB0aXRsZSkge1xuICAgIG1lbW9yeS5lZGl0UHJvamVjdChpbmRleFByb2plY3QsIHRpdGxlKVxuICB9O1xuXG4gIGZ1bmN0aW9uIG1vZGlmeVRhc2sgKGNvdW50ZXIsIGluZGV4UHJvamVjdCwgdGFza05hbWUpIHtcbiAgICBtZW1vcnkuZWRpdFRhc2soY291bnRlciwgaW5kZXhQcm9qZWN0LCB0YXNrTmFtZSlcbiAgfVxuXG4gIGxldCBnZXRQcm9qZWN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbWVtb3J5LmdldFByb2plY3QoKTtcbiAgfTtcblxuICBmdW5jdGlvbiBkZWxldGVQcm9qZWN0IChpbmRleFByb2plY3QpIHtcbiAgICBtZW1vcnkuZGVsZXRlUHJvamVjdChpbmRleFByb2plY3QpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZVByb2plY3QsXG4gICAgY3JlYXRlVGFzayxcbiAgICBkZWxldGVUYXNrLFxuICAgIG1vZGlmeVByb2plY3QsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgZGVsZXRlUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IGNvbnRyb2wgfTsiLCIvLyBNRU1PUlkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgbWVtb3J5ID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHByb2plY3RzID0gW107XG5cbiAgbGV0IGFkZFByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdCkge1xuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgcmV0dXJuIGdldFByb2plY3RDb3VudGVyKClcbiAgfTtcblxuICBsZXQgYWRkVGFzayA9IGZ1bmN0aW9uIChpbmRleFByb2plY3QsIHRhc2spIHtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLmFkZFRhc2sodGFzaylcbiAgICByZXR1cm4gZ2V0VGFza0NvdW50ZXIoaW5kZXhQcm9qZWN0KVxuICB9O1xuXG4gIGxldCBnZXRQcm9qZWN0Q291bnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJvamVjdHMubGVuZ3RoO1xuICB9O1xuXG4gIGxldCBnZXRUYXNrQ291bnRlciA9IGZ1bmN0aW9uIChpbmRleFByb2plY3QpIHtcbiAgICByZXR1cm4gcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzLmxlbmd0aFxuICB9O1xuICBcbiAgbGV0IGdldFByb2plY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFsuLi5wcm9qZWN0c107XG4gIH07XG5cbiAgbGV0IGRlbGV0ZVRhc2sgPSBmdW5jdGlvbiAoaW5kZXhUYXNrLCBpbmRleFByb2plY3QpIHtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3Muc3BsaWNlKGluZGV4VGFzaywgMSlcbiAgfTtcblxuICBsZXQgZWRpdFByb2plY3QgPSBmdW5jdGlvbiAoaW5kZXhQcm9qZWN0LCB0aXRsZSkge1xuICAgIHByb2plY3RzW2luZGV4UHJvamVjdF0ucHJvamVjdC50aXRsZSA9IHRpdGxlO1xuICB9O1xuXG4gIGxldCBlZGl0VGFzayA9IGZ1bmN0aW9uIChpbmRleFRhc2ssIGluZGV4UHJvamVjdCwgdGl0bGUpIHtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3NbaW5kZXhUYXNrXS50aXRsZSA9IHRpdGxlO1xuICB9XG5cbiAgbGV0IGRlbGV0ZVByb2plY3QgPSBmdW5jdGlvbiAoaW5kZXhQcm9qZWN0KSB7XG4gICAgcHJvamVjdHMuc3BsaWNlKGluZGV4UHJvamVjdCwgMSlcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYWRkUHJvamVjdCxcbiAgICBhZGRUYXNrLFxuICAgIGdldFByb2plY3RDb3VudGVyLFxuICAgIGdldFRhc2tDb3VudGVyLFxuICAgIGdldFByb2plY3QsXG4gICAgZWRpdFByb2plY3QsXG4gICAgZWRpdFRhc2ssXG4gICAgZGVsZXRlVGFzayxcbiAgICBkZWxldGVQcm9qZWN0LFxuICB9O1xufSkoKTtcblxuLy8gREFUQUJBU0UgTU9EVUxFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IGRhdGFiYXNlID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHdyaXRlID0gZnVuY3Rpb24gKG9iaikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibWFpblwiLCBKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgfTtcblxuICBsZXQgcmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm1haW5cIikpO1xuICB9O1xuXG4gIGxldCByZXNldCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gIHJldHVybiB7XG4gICAgd3JpdGUsXG4gICAgcmVhZCxcbiAgICByZXNldCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IG1lbW9yeSwgZGF0YWJhc2UgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbXBhcmVBc2MsIGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IGNvbnRyb2wgfSBmcm9tIFwiLi9sb2dpY1wiXG5pbXBvcnQgeyBtZW1vcnkgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5pbXBvcnQgeyBkaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiXG5cblxud2luZG93LmNvbnRyb2wgPSBjb250cm9sO1xud2luZG93Lm1lbW9yeSA9IG1lbW9yeTtcblxuZGlzcGxheS5jYWNoZURPTSgpO1xuZGlzcGxheS5idXR0b25MaXN0ZW5lcigpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBmb3JtYXQobmV3IERhdGUoMjAxNCwgMSwgMTEpLCAneXl5eS1NTS1kZCcpXG4vLyAvLz0+ICcyMDE0LTAyLTExJ1xuXG4vLyBjb25zdCBkYXRlcyA9IFtcbi8vICAgbmV3IERhdGUoMTk5NSwgNiwgMiksXG4vLyAgIG5ldyBEYXRlKDE5ODcsIDEsIDExKSxcbi8vICAgbmV3IERhdGUoMTk4OSwgNiwgMTApLFxuLy8gXVxuXG4vLyBkYXRlcy5zb3J0KGNvbXBhcmVBc2MpXG4vLyAvLz0+IFtcbi8vIC8vICAgV2VkIEZlYiAxMSAxOTg3IDAwOjAwOjAwLFxuLy8gLy8gICBNb24gSnVsIDEwIDE5ODkgMDA6MDA6MDAsXG4vLyAvLyAgIFN1biBKdWwgMDIgMTk5NSAwMDowMDowMFxuLy8gLy8gXVxuXG4vLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29sb3JTZXR0aW5nJywgJyNhNDUwOWInKTtcblxuLy8gY29uc29sZS5kaXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjb2xvclNldHRpbmdcIikpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==