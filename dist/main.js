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

  function listenProject() {
    let projects = document.querySelectorAll(".project-data");
    projects.forEach((elem) => elem.addEventListener("click", function(e){
      if (e.target.id == "deleteProject") {
        deleteProjectListen(e.target.dataset.counter)
      } else if (e.target.id == "editProject") {
        projectListen(e.target.dataset.counter)
        listenProjectTitleMod(e);
      } else {
        projectListen(e.target.dataset.counter)
      }
    }))
  }

  function projectListen(counter) {
    selectedProject = counter
    refresh();
  }

  function deleteProjectListen(counter) {
    let newSize = _logic__WEBPACK_IMPORTED_MODULE_1__.control.deleteProject(counter) - 1;
    if (selectedProject > newSize) {
      selectedProject = selectedProject - 1;
    }
    refresh();
  }

  // PROJECT NAME EDIT WHEN EDIT BUTTON PRESSED
  function listenProjectTitleMod(e) {
    let index = e.target.dataset.counter;
    console.log(index)
    let projectEntry = document
    .querySelector(
      `.project-entry[data-counter="${index}"]`);
    // let projectName = projectEntry.
    console.dir(projectEntry)
    let projectName = projectEntry.childNodes[0].textContent
    let input = _htmlCreator__WEBPACK_IMPORTED_MODULE_0__.htmlCreator.projectMod(index, projectName);
    console.log(projectName)
    projectEntry.replaceWith(input);
    
  }

  function refresh() {
    cacheDOM();
    buttonListener();
    populateProjects();
    populateTasks();
    deleteTaskListen();
    listenProject();
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

    projectEntry.appendChild(input);
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
    projectMod,
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
    return _storage__WEBPACK_IMPORTED_MODULE_1__.memory.deleteProject(indexProject)
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
    return projects.length;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7OztVQ3pFRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDYjtBQUNFO0FBQ0E7OztBQUduQyxpQkFBaUIsMkNBQU87QUFDeEIsZ0JBQWdCLDRDQUFNOztBQUV0QixzREFBZ0I7QUFDaEIsNERBQXNCOztBQUV0Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvZmFjdG9yaWVzLmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvaHRtbENyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHRtbENyZWF0b3IgfSBmcm9tIFwiLi9odG1sQ3JlYXRvclwiO1xuaW1wb3J0IHsgY29udHJvbCB9IGZyb20gXCIuL2xvZ2ljXCI7XG5cbmxldCBkaXNwbGF5ID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHByb2plY3RBZGRCdXR0b247XG4gIGxldCB0YXNrQWRkQnV0dG9uO1xuICBsZXQgcHJvamVjdENvbnRhaW5lcjtcbiAgbGV0IHRhc2tDb250YWluZXI7XG4gIGxldCBzZWxlY3RlZFByb2plY3QgPSAwO1xuXG4gIGZ1bmN0aW9uIGNhY2hlRE9NKCkge1xuICAgIHByb2plY3RBZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtYWRkXCIpO1xuICAgIHRhc2tBZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stYWRkXCIpO1xuICAgIHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3Qtc2VsZWN0b3JcIik7XG4gICAgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1zZWxlY3RvclwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1dHRvbkxpc3RlbmVyKCkge1xuICAgIHByb2plY3RBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZVByb2plY3QpO1xuICAgIHRhc2tBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZVRhc2spO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9wdWxhdGVQcm9qZWN0cygpIHtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbGV0IHByb2plY3RMaXN0ID0gY29udHJvbC5nZXRQcm9qZWN0cygpO1xuICAgIHByb2plY3RMaXN0LmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBodG1sQ3JlYXRvci5wcm9qZWN0KGluZGV4LCBlbGVtLnByb2plY3QudGl0bGUpXG4gICAgICApO1xuICAgIH0pO1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LWRhdGFcIilcbiAgICAgIFtzZWxlY3RlZFByb2plY3RdLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVudHJ5LWFjdGl2ZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVRhc2tMaXN0ZW4oKSB7XG4gICAgbGV0IHRhc2tEZWxldGVCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNkZWxldGVUYXNrXCIpO1xuICAgIHRhc2tEZWxldGVCdXR0b25zLmZvckVhY2goKGVsZW0pID0+XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb250cm9sLmRlbGV0ZVRhc2soZS50YXJnZXQuZGF0YXNldC5jb3VudGVyLCBzZWxlY3RlZFByb2plY3QpO1xuICAgICAgICByZWZyZXNoKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBwb3B1bGF0ZVRhc2tzKCkge1xuICAgIHRhc2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBsZXQgdGFza0xpc3QgPSBjb250cm9sLmdldFByb2plY3RzKClbc2VsZWN0ZWRQcm9qZWN0XS5wcm9qZWN0LnRhc2tzO1xuICAgIHRhc2tMaXN0LmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGh0bWxDcmVhdG9yLnRhc2soaW5kZXgsIGVsZW0udGl0bGUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QoZSkge1xuICAgIGxldCBpbmRleFByb2plY3QgPSBjb250cm9sLmNyZWF0ZVByb2plY3QoKTtcbiAgICByZWZyZXNoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVUYXNrKGUpIHtcbiAgICBjb250cm9sLmNyZWF0ZVRhc2soc2VsZWN0ZWRQcm9qZWN0KTtcbiAgICByZWZyZXNoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5Qcm9qZWN0KCkge1xuICAgIGxldCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1kYXRhXCIpO1xuICAgIHByb2plY3RzLmZvckVhY2goKGVsZW0pID0+IGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgaWYgKGUudGFyZ2V0LmlkID09IFwiZGVsZXRlUHJvamVjdFwiKSB7XG4gICAgICAgIGRlbGV0ZVByb2plY3RMaXN0ZW4oZS50YXJnZXQuZGF0YXNldC5jb3VudGVyKVxuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5pZCA9PSBcImVkaXRQcm9qZWN0XCIpIHtcbiAgICAgICAgcHJvamVjdExpc3RlbihlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIpXG4gICAgICAgIGxpc3RlblByb2plY3RUaXRsZU1vZChlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2plY3RMaXN0ZW4oZS50YXJnZXQuZGF0YXNldC5jb3VudGVyKVxuICAgICAgfVxuICAgIH0pKVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvamVjdExpc3Rlbihjb3VudGVyKSB7XG4gICAgc2VsZWN0ZWRQcm9qZWN0ID0gY291bnRlclxuICAgIHJlZnJlc2goKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVByb2plY3RMaXN0ZW4oY291bnRlcikge1xuICAgIGxldCBuZXdTaXplID0gY29udHJvbC5kZWxldGVQcm9qZWN0KGNvdW50ZXIpIC0gMTtcbiAgICBpZiAoc2VsZWN0ZWRQcm9qZWN0ID4gbmV3U2l6ZSkge1xuICAgICAgc2VsZWN0ZWRQcm9qZWN0ID0gc2VsZWN0ZWRQcm9qZWN0IC0gMTtcbiAgICB9XG4gICAgcmVmcmVzaCgpO1xuICB9XG5cbiAgLy8gUFJPSkVDVCBOQU1FIEVESVQgV0hFTiBFRElUIEJVVFRPTiBQUkVTU0VEXG4gIGZ1bmN0aW9uIGxpc3RlblByb2plY3RUaXRsZU1vZChlKSB7XG4gICAgbGV0IGluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5jb3VudGVyO1xuICAgIGNvbnNvbGUubG9nKGluZGV4KVxuICAgIGxldCBwcm9qZWN0RW50cnkgPSBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYC5wcm9qZWN0LWVudHJ5W2RhdGEtY291bnRlcj1cIiR7aW5kZXh9XCJdYCk7XG4gICAgLy8gbGV0IHByb2plY3ROYW1lID0gcHJvamVjdEVudHJ5LlxuICAgIGNvbnNvbGUuZGlyKHByb2plY3RFbnRyeSlcbiAgICBsZXQgcHJvamVjdE5hbWUgPSBwcm9qZWN0RW50cnkuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudFxuICAgIGxldCBpbnB1dCA9IGh0bWxDcmVhdG9yLnByb2plY3RNb2QoaW5kZXgsIHByb2plY3ROYW1lKTtcbiAgICBjb25zb2xlLmxvZyhwcm9qZWN0TmFtZSlcbiAgICBwcm9qZWN0RW50cnkucmVwbGFjZVdpdGgoaW5wdXQpO1xuICAgIFxuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICBjYWNoZURPTSgpO1xuICAgIGJ1dHRvbkxpc3RlbmVyKCk7XG4gICAgcG9wdWxhdGVQcm9qZWN0cygpO1xuICAgIHBvcHVsYXRlVGFza3MoKTtcbiAgICBkZWxldGVUYXNrTGlzdGVuKCk7XG4gICAgbGlzdGVuUHJvamVjdCgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjYWNoZURPTSxcbiAgICBidXR0b25MaXN0ZW5lcixcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IGRpc3BsYXkgfTtcbiIsIi8vIFBST0pFQ1QgRkFDVE9SWSBGVU5DVElPTiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmxldCBwcm9qZWN0RmFjdG9yeSA9IGZ1bmN0aW9uICh0aXRsZSkge1xuICByZXR1cm4ge1xuICAgIHByb2plY3Q6IHtcbiAgICAgIHRpdGxlLFxuICAgICAgdGFza3M6IFtdLFxuICAgIH0sXG4gICAgYWRkVGFzazogZnVuY3Rpb24gKG5ld1Rhc2spIHtcbiAgICAgIHRoaXMucHJvamVjdC50YXNrcy5wdXNoKG5ld1Rhc2spXG4gICAgfSxcbiAgfTtcbn07XG5cbi8vIFRBU0sgRkFDVE9SWSBGVU5DVElPTi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmxldCB0YXNrRmFjdG9yeSA9IGZ1bmN0aW9uICh0aXRsZSkge1xuICByZXR1cm4ge1xuICAgIHRpdGxlLFxuICAgIGR1ZURhdGU6IFwiXCIsXG4gICAgZG9uZTogZmFsc2UsXG4gIH07O1xufTtcblxuZXhwb3J0IHsgcHJvamVjdEZhY3RvcnksIHRhc2tGYWN0b3J5IH0iLCIvLyBDUkVBVEUgVEhFIEhUTUwgRk9SIFRIRSBQUk9KRUNUIEVOVFJZIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgaHRtbENyZWF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgcHJvamVjdCA9IGZ1bmN0aW9uIChpbmRleCwgdGl0bGUpIHtcbiAgICBsZXQgcHJvamVjdEVudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0RW50cnkuY2xhc3NMaXN0LmFkZChcInByb2plY3QtZW50cnlcIiwgXCJwcm9qZWN0LWRhdGFcIik7XG4gICAgcHJvamVjdEVudHJ5LnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG5cbiAgICBsZXQgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gdGl0bGU7XG4gICAgcHJvamVjdE5hbWUuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmFtZVwiKTtcbiAgICBwcm9qZWN0TmFtZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuXG4gICAgbGV0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImVkaXRQcm9qZWN0XCIpO1xuICAgIGVkaXRJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWVkaXQtOTYucG5nXCI7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBlZGl0SWNvbi5hbHQgPSBcIkVkaXQgSWNvblwiO1xuXG4gICAgbGV0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkZWxldGVQcm9qZWN0XCIpO1xuICAgIGRlbGV0ZUljb24uc3JjID0gXCIvYXNzZXRzL2ljb25zOC10cmFzaC05Ni1ub25hY3RpdmUuc3ZnXCI7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGRlbGV0ZUljb24uYWx0ID0gXCJkZWxldGUgSWNvblwiO1xuXG4gICAgcHJvamVjdEVudHJ5LmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcbiAgICBwcm9qZWN0RW50cnkuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xuICAgIHByb2plY3RFbnRyeS5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcblxuICAgIHJldHVybiBwcm9qZWN0RW50cnk7XG4gIH07XG5cbiAgLy8gQ1JFQVRFIFRIRSBIVE1MIEZPUiBUSEUgUFJPSkVDVCBFTlRSWSBNT0RJRklDQVRJT05cblxuICBsZXQgcHJvamVjdE1vZCA9IGZ1bmN0aW9uIChpbmRleCwgdGl0bGUpIHtcbiAgICBsZXQgcHJvamVjdEVudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0RW50cnkuY2xhc3NMaXN0LmFkZChcInByb2plY3QtZW50cnlcIiwgXCJwcm9qZWN0LWRhdGFcIiwgXCJwcm9qZWN0LWVudHJ5LWFjdGl2ZVwiKTtcbiAgICBwcm9qZWN0RW50cnkuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcblxuICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKFwiaW5wdXQtcHJvamVjdC1uYW1lXCIpXG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBpbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgaW5wdXQudmFsdWUgPSB0aXRsZTtcblxuICAgIGxldCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJlZGl0UHJvamVjdFwiKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1lZGl0LTk2LnBuZ1wiO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZWRpdEljb24uYWx0ID0gXCJFZGl0IEljb25cIjtcblxuICAgIGxldCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGVsZXRlUHJvamVjdFwiKTtcbiAgICBkZWxldGVJY29uLnNyYyA9IFwiL2Fzc2V0cy9pY29uczgtdHJhc2gtOTYtbm9uYWN0aXZlLnN2Z1wiO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBkZWxldGVJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIHByb2plY3RFbnRyeS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgcHJvamVjdEVudHJ5LmFwcGVuZENoaWxkKGVkaXRJY29uKTtcbiAgICBwcm9qZWN0RW50cnkuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG5cbiAgICByZXR1cm4gcHJvamVjdEVudHJ5O1xuICB9O1xuXG4gIC8vIENSRUFURSBUSEUgSFRNTCBGT1IgVEhFIFRBU0sgRU5UUlkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgbGV0IHRhc2sgPSBmdW5jdGlvbiAoaW5kZXgsIHRpdGxlKSB7XG4gICAgbGV0IHRhc2tFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza0VudHJ5LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWVudHJ5XCIsIFwidGFzay1kYXRhXCIpO1xuICAgIHRhc2tFbnRyeS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuXG4gICAgbGV0IGNoZWNrbWFya0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGNoZWNrbWFya0ljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtY2hlY2ttYXJrX3VuY2hlY2tlZC05Ni5wbmdcIjtcbiAgICBjaGVja21hcmtJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIGxldCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza05hbWUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICB0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xuICAgIHRhc2tOYW1lLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG5cbiAgICBsZXQgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRlbGV0ZVRhc2tcIik7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGRlbGV0ZUljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtdHJhc2gtOTYtbm9uYWN0aXZlLnN2Z1wiO1xuICAgIGRlbGV0ZUljb24uYWx0ID0gXCJkZWxldGUgSWNvblwiO1xuXG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGNoZWNrbWFya0ljb24pO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZCh0YXNrTmFtZSk7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuXG4gICAgcmV0dXJuIHRhc2tFbnRyeTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHByb2plY3QsXG4gICAgcHJvamVjdE1vZCxcbiAgICB0YXNrLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgaHRtbENyZWF0b3IgfTtcbiIsImltcG9ydCB7IHByb2plY3RGYWN0b3J5LCB0YXNrRmFjdG9yeSB9IGZyb20gXCIuL2ZhY3Rvcmllc1wiO1xuaW1wb3J0IHsgbWVtb3J5IH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5sZXQgY29udHJvbCA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBjcmVhdGVQcm9qZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBuZXdQcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkoKTtcbiAgICBsZXQgY291bnRlciA9IG1lbW9yeS5hZGRQcm9qZWN0KG5ld1Byb2plY3QpIC0gMTtcbiAgICBsZXQgcHJvamVjdE5hbWUgPSBgTmV3IHByb2plY3RgXG4gICAgbW9kaWZ5UHJvamVjdChjb3VudGVyLCBwcm9qZWN0TmFtZSlcbiAgICByZXR1cm4gY291bnRlcjsgLy9yZXR1cm5zIG5ldyBwcm9qZWN0IGluZGV4XG4gIH07XG5cbiAgbGV0IGNyZWF0ZVRhc2sgPSBmdW5jdGlvbiAoaW5kZXhQcm9qZWN0KSB7XG4gICAgbGV0IG5ld1Rhc2sgPSB0YXNrRmFjdG9yeSgpO1xuICAgIGxldCBjb3VudGVyID0gbWVtb3J5LmFkZFRhc2soaW5kZXhQcm9qZWN0LCBuZXdUYXNrKSAtIDE7XG4gICAgbGV0IHRhc2tOYW1lID0gYE5ldyB0YXNrYDtcbiAgICBtb2RpZnlUYXNrKGNvdW50ZXIsIGluZGV4UHJvamVjdCwgdGFza05hbWUpXG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG5cbiAgbGV0IGRlbGV0ZVRhc2sgPSBmdW5jdGlvbiAoaW5kZXhUYXNrLCBpbmRleFByb2plY3QpIHtcbiAgICBtZW1vcnkuZGVsZXRlVGFzayhpbmRleFRhc2ssIGluZGV4UHJvamVjdClcbiAgfTtcblxuICBmdW5jdGlvbiBtb2RpZnlQcm9qZWN0IChpbmRleFByb2plY3QsIHRpdGxlKSB7XG4gICAgbWVtb3J5LmVkaXRQcm9qZWN0KGluZGV4UHJvamVjdCwgdGl0bGUpXG4gIH07XG5cbiAgZnVuY3Rpb24gbW9kaWZ5VGFzayAoY291bnRlciwgaW5kZXhQcm9qZWN0LCB0YXNrTmFtZSkge1xuICAgIG1lbW9yeS5lZGl0VGFzayhjb3VudGVyLCBpbmRleFByb2plY3QsIHRhc2tOYW1lKVxuICB9XG5cbiAgbGV0IGdldFByb2plY3RzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBtZW1vcnkuZ2V0UHJvamVjdCgpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGRlbGV0ZVByb2plY3QgKGluZGV4UHJvamVjdCkge1xuICAgIHJldHVybiBtZW1vcnkuZGVsZXRlUHJvamVjdChpbmRleFByb2plY3QpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZVByb2plY3QsXG4gICAgY3JlYXRlVGFzayxcbiAgICBkZWxldGVUYXNrLFxuICAgIG1vZGlmeVByb2plY3QsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgZGVsZXRlUHJvamVjdCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IGNvbnRyb2wgfTsiLCIvLyBNRU1PUlkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgbWVtb3J5ID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHByb2plY3RzID0gW107XG5cbiAgbGV0IGFkZFByb2plY3QgPSBmdW5jdGlvbiAocHJvamVjdCkge1xuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgcmV0dXJuIGdldFByb2plY3RDb3VudGVyKClcbiAgfTtcblxuICBsZXQgYWRkVGFzayA9IGZ1bmN0aW9uIChpbmRleFByb2plY3QsIHRhc2spIHtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLmFkZFRhc2sodGFzaylcbiAgICByZXR1cm4gZ2V0VGFza0NvdW50ZXIoaW5kZXhQcm9qZWN0KVxuICB9O1xuXG4gIGxldCBnZXRQcm9qZWN0Q291bnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJvamVjdHMubGVuZ3RoO1xuICB9O1xuXG4gIGxldCBnZXRUYXNrQ291bnRlciA9IGZ1bmN0aW9uIChpbmRleFByb2plY3QpIHtcbiAgICByZXR1cm4gcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzLmxlbmd0aFxuICB9O1xuICBcbiAgbGV0IGdldFByb2plY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFsuLi5wcm9qZWN0c107XG4gIH07XG5cbiAgbGV0IGRlbGV0ZVRhc2sgPSBmdW5jdGlvbiAoaW5kZXhUYXNrLCBpbmRleFByb2plY3QpIHtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3Muc3BsaWNlKGluZGV4VGFzaywgMSlcbiAgfTtcblxuICBsZXQgZWRpdFByb2plY3QgPSBmdW5jdGlvbiAoaW5kZXhQcm9qZWN0LCB0aXRsZSkge1xuICAgIHByb2plY3RzW2luZGV4UHJvamVjdF0ucHJvamVjdC50aXRsZSA9IHRpdGxlO1xuICB9O1xuXG4gIGxldCBlZGl0VGFzayA9IGZ1bmN0aW9uIChpbmRleFRhc2ssIGluZGV4UHJvamVjdCwgdGl0bGUpIHtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3NbaW5kZXhUYXNrXS50aXRsZSA9IHRpdGxlO1xuICB9XG5cbiAgbGV0IGRlbGV0ZVByb2plY3QgPSBmdW5jdGlvbiAoaW5kZXhQcm9qZWN0KSB7XG4gICAgcHJvamVjdHMuc3BsaWNlKGluZGV4UHJvamVjdCwgMSlcbiAgICByZXR1cm4gcHJvamVjdHMubGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRQcm9qZWN0LFxuICAgIGFkZFRhc2ssXG4gICAgZ2V0UHJvamVjdENvdW50ZXIsXG4gICAgZ2V0VGFza0NvdW50ZXIsXG4gICAgZ2V0UHJvamVjdCxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBlZGl0VGFzayxcbiAgICBkZWxldGVUYXNrLFxuICAgIGRlbGV0ZVByb2plY3QsXG4gIH07XG59KSgpO1xuXG4vLyBEQVRBQkFTRSBNT0RVTEUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgZGF0YWJhc2UgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgd3JpdGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJtYWluXCIsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICB9O1xuXG4gIGxldCByZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibWFpblwiKSk7XG4gIH07XG5cbiAgbGV0IHJlc2V0ID0gZnVuY3Rpb24gKCkge307XG5cbiAgcmV0dXJuIHtcbiAgICB3cml0ZSxcbiAgICByZWFkLFxuICAgIHJlc2V0LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgbWVtb3J5LCBkYXRhYmFzZSB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY29tcGFyZUFzYywgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgY29udHJvbCB9IGZyb20gXCIuL2xvZ2ljXCJcbmltcG9ydCB7IG1lbW9yeSB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcbmltcG9ydCB7IGRpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCJcblxuXG53aW5kb3cuY29udHJvbCA9IGNvbnRyb2w7XG53aW5kb3cubWVtb3J5ID0gbWVtb3J5O1xuXG5kaXNwbGF5LmNhY2hlRE9NKCk7XG5kaXNwbGF5LmJ1dHRvbkxpc3RlbmVyKCk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIGZvcm1hdChuZXcgRGF0ZSgyMDE0LCAxLCAxMSksICd5eXl5LU1NLWRkJylcbi8vIC8vPT4gJzIwMTQtMDItMTEnXG5cbi8vIGNvbnN0IGRhdGVzID0gW1xuLy8gICBuZXcgRGF0ZSgxOTk1LCA2LCAyKSxcbi8vICAgbmV3IERhdGUoMTk4NywgMSwgMTEpLFxuLy8gICBuZXcgRGF0ZSgxOTg5LCA2LCAxMCksXG4vLyBdXG5cbi8vIGRhdGVzLnNvcnQoY29tcGFyZUFzYylcbi8vIC8vPT4gW1xuLy8gLy8gICBXZWQgRmViIDExIDE5ODcgMDA6MDA6MDAsXG4vLyAvLyAgIE1vbiBKdWwgMTAgMTk4OSAwMDowMDowMCxcbi8vIC8vICAgU3VuIEp1bCAwMiAxOTk1IDAwOjAwOjAwXG4vLyAvLyBdXG5cbi8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb2xvclNldHRpbmcnLCAnI2E0NTA5YicpO1xuXG4vLyBjb25zb2xlLmRpcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNvbG9yU2V0dGluZ1wiKSk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9