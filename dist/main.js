/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/database.js":
/*!*************************!*\
  !*** ./src/database.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "database": () => (/* binding */ database),
/* harmony export */   "memory": () => (/* binding */ memory)
/* harmony export */ });
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




/***/ }),

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
  let projectSelect;
  let taskSelect;

  let cacheDOM = function () {
    projectAddButton = document.querySelector(".project-add");
    taskAddButton = document.querySelector(".task-add");
    projectSelect = document.querySelector("#project-selector");
    taskSelect = document.querySelector("#task-selector");
  };

  let buttonListener = function () {
    projectAddButton.addEventListener("click", createProject);
  };

  function createProject(e) {
    _logic__WEBPACK_IMPORTED_MODULE_1__.control.createProject;
    projectSelect.appendChild(_htmlCreator__WEBPACK_IMPORTED_MODULE_0__.htmlCreator.project("New project"));
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
/* harmony export */   "project": () => (/* binding */ project),
/* harmony export */   "task": () => (/* binding */ task)
/* harmony export */ });
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
let htmlCreator = (function () {
  let project = function (projectTitle) {
    let projectEntry = document.createElement("div");
    projectEntry.classList.add("project-entry", "project-data");

    let projectName = document.createElement("div");
    projectName.textContent = projectTitle;
    projectName.classList.add("project-name");

    let deleteIcon = document.createElement("img");
    deleteIcon.src = "/assets/icons8-trash-96-nonactive.svg";
    deleteIcon.alt = "delete Icon";

    projectEntry.appendChild(projectName);
    projectEntry.appendChild(deleteIcon);
    return projectEntry;
  };

  let task = function () {
    let taskEntry = document.createElement("div");
    taskEntry.classList.add("task-entry");

    let checkmarkIcon = document.createElement("img");
    checkmarkIcon.src = "./assets/icons8-checkmark_unchecked-96.png";
    checkmarkIcon.alt = "delete Icon";

    let taskName = document.createElement("div");
    taskName.classList.add("project-name");

    let deleteIcon = document.createElement("img");
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
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database */ "./src/database.js");



let control = (function () {
  let createProject = function (projectTitle) {
    let newProject = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.project)(projectTitle);
    _database__WEBPACK_IMPORTED_MODULE_1__.memory.writeProject(newProject);
  };
  let getProjects = function () {
    return _database__WEBPACK_IMPORTED_MODULE_1__.memory.getProject();
  };
  let createTask = function (taskTitle, projectTitle) {
    let newTask = (0,_factories__WEBPACK_IMPORTED_MODULE_0__.task)(taskTitle);
    _database__WEBPACK_IMPORTED_MODULE_1__.memory.writeTask(newTask, projectTitle);
  };

  return {
    createProject,
    createTask,
    getProjects,
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
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database */ "./src/database.js");
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display */ "./src/display.js");






window.control = _logic__WEBPACK_IMPORTED_MODULE_0__.control;
window.memory = _database__WEBPACK_IMPORTED_MODULE_1__.memory;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUUyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q2dCO0FBQ1Y7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUkseURBQXFCO0FBQ3pCLDhCQUE4Qiw2REFBbUI7QUFDakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVrQjs7Ozs7Ozs7Ozs7Ozs7OztBQy9CbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRXNCOzs7Ozs7Ozs7Ozs7Ozs7OztBQzlDcUI7QUFDUjs7QUFFcEM7QUFDQTtBQUNBLHFCQUFxQixtREFBTztBQUM1QixJQUFJLDBEQUFtQjtBQUN2QjtBQUNBO0FBQ0EsV0FBVyx3REFBaUI7QUFDNUI7QUFDQTtBQUNBLGtCQUFrQixnREFBSTtBQUN0QixJQUFJLHVEQUFnQjtBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7VUNyQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ2I7QUFDRztBQUNEOzs7QUFHbkMsaUJBQWlCLDJDQUFPO0FBQ3hCLGdCQUFnQiw2Q0FBTTs7QUFFdEIsc0RBQWdCO0FBQ2hCLDREQUFzQjs7QUFFdEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxRCIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvZGF0YWJhc2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvZmFjdG9yaWVzLmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvaHRtbENyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBNRU1PUlkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmxldCBtZW1vcnkgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgcHJvamVjdHMgPSBbXTtcbiAgbGV0IHdyaXRlUHJvamVjdCA9IGZ1bmN0aW9uIChwcm9qZWN0KSB7XG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgfTtcbiAgbGV0IHdyaXRlVGFzayA9IGZ1bmN0aW9uICh0YXNrLCBwcm9qZWN0VGl0bGUpIHtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChlbGVtKSA9PiB3cml0ZShlbGVtKSk7XG4gICAgZnVuY3Rpb24gd3JpdGUoZSkge1xuICAgICAgaWYgKGUucHJvamVjdC50aXRsZSA9PSBwcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgZS5hZGRUYXNrKHRhc2spO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgbGV0IGdldFByb2plY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFsuLi5wcm9qZWN0c107XG4gIH07XG4gIHJldHVybiB7XG4gICAgd3JpdGVQcm9qZWN0LFxuICAgIHdyaXRlVGFzayxcbiAgICBnZXRQcm9qZWN0LFxuICB9O1xufSkoKTtcblxuLy8gREFUQUJBU0UgTU9EVUxFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IGRhdGFiYXNlID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHdyaXRlID0gZnVuY3Rpb24gKG9iaikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibWFpblwiLCBKU09OLnN0cmluZ2lmeShvYmopKTtcbiAgfTtcblxuICBsZXQgcmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm1haW5cIikpO1xuICB9O1xuXG4gIGxldCByZXNldCA9IGZ1bmN0aW9uICgpIHt9O1xuXG4gIHJldHVybiB7XG4gICAgd3JpdGUsXG4gICAgcmVhZCxcbiAgICByZXNldCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IG1lbW9yeSwgZGF0YWJhc2UgfTtcbiIsImltcG9ydCB7IGh0bWxDcmVhdG9yIH0gZnJvbSBcIi4vaHRtbENyZWF0b3JcIjtcbmltcG9ydCB7IGNvbnRyb2wgfSBmcm9tIFwiLi9sb2dpY1wiO1xuXG5sZXQgZGlzcGxheSA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBwcm9qZWN0QWRkQnV0dG9uO1xuICBsZXQgdGFza0FkZEJ1dHRvbjtcbiAgbGV0IHByb2plY3RTZWxlY3Q7XG4gIGxldCB0YXNrU2VsZWN0O1xuXG4gIGxldCBjYWNoZURPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcm9qZWN0QWRkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWFkZFwiKTtcbiAgICB0YXNrQWRkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWFkZFwiKTtcbiAgICBwcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXNlbGVjdG9yXCIpO1xuICAgIHRhc2tTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stc2VsZWN0b3JcIik7XG4gIH07XG5cbiAgbGV0IGJ1dHRvbkxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2plY3RBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZVByb2plY3QpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QoZSkge1xuICAgIGNvbnRyb2wuY3JlYXRlUHJvamVjdDtcbiAgICBwcm9qZWN0U2VsZWN0LmFwcGVuZENoaWxkKGh0bWxDcmVhdG9yLnByb2plY3QoXCJOZXcgcHJvamVjdFwiKSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNhY2hlRE9NLFxuICAgIGJ1dHRvbkxpc3RlbmVyLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgZGlzcGxheSB9O1xuIiwiLy8gUFJPSkVDVCBGQUNUT1JZIEZVTkNUSU9OICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IHByb2plY3QgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgbGV0IHByb2plY3QgPSB7XG4gICAgdGl0bGUsXG4gICAgdGFza3M6IFtdLFxuICB9XG4gIGxldCBhZGRUYXNrID0gZnVuY3Rpb24gKG5ld1Rhc2spIHtcbiAgICBwcm9qZWN0LnRhc2tzLnB1c2gobmV3VGFzaylcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0LFxuICAgIGFkZFRhc2ssXG4gIH07XG59O1xuXG4vLyBUQVNLIEZBQ1RPUlkgRlVOQ1RJT04tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgdGFzayA9IGZ1bmN0aW9uICh0aXRsZSwgZHVlRGF0ZSkge1xuICBsZXQgdGFzayA9IHtcbiAgICB0aXRsZSxcbiAgICBkdWVEYXRlLFxuICAgIGRvbmU6IGZhbHNlLFxuICB9O1xuICByZXR1cm4ge1xuICAgIHRhc2ssXG4gIH07XG59O1xuXG5leHBvcnQgeyBwcm9qZWN0LCB0YXNrIH0iLCJsZXQgaHRtbENyZWF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgcHJvamVjdCA9IGZ1bmN0aW9uIChwcm9qZWN0VGl0bGUpIHtcbiAgICBsZXQgcHJvamVjdEVudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0RW50cnkuY2xhc3NMaXN0LmFkZChcInByb2plY3QtZW50cnlcIiwgXCJwcm9qZWN0LWRhdGFcIik7XG5cbiAgICBsZXQgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdFRpdGxlO1xuICAgIHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XG5cbiAgICBsZXQgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZGVsZXRlSWNvbi5zcmMgPSBcIi9hc3NldHMvaWNvbnM4LXRyYXNoLTk2LW5vbmFjdGl2ZS5zdmdcIjtcbiAgICBkZWxldGVJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIHByb2plY3RFbnRyeS5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG4gICAgcHJvamVjdEVudHJ5LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuICAgIHJldHVybiBwcm9qZWN0RW50cnk7XG4gIH07XG5cbiAgbGV0IHRhc2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHRhc2tFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza0VudHJ5LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWVudHJ5XCIpO1xuXG4gICAgbGV0IGNoZWNrbWFya0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGNoZWNrbWFya0ljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtY2hlY2ttYXJrX3VuY2hlY2tlZC05Ni5wbmdcIjtcbiAgICBjaGVja21hcmtJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIGxldCB0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGFza05hbWUuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmFtZVwiKTtcblxuICAgIGxldCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkZWxldGVJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LXRyYXNoLTk2LW5vbmFjdGl2ZS5zdmdcIjtcbiAgICBkZWxldGVJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZChjaGVja21hcmtJY29uKTtcbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQodGFza05hbWUpO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcblxuICAgIHJldHVybiB0YXNrRW50cnk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0LFxuICAgIHRhc2ssXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBodG1sQ3JlYXRvciB9O1xuIiwiaW1wb3J0IHsgcHJvamVjdCwgdGFzayB9IGZyb20gXCIuL2ZhY3Rvcmllc1wiO1xuaW1wb3J0IHsgbWVtb3J5IH0gZnJvbSBcIi4vZGF0YWJhc2VcIjtcblxubGV0IGNvbnRyb2wgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgY3JlYXRlUHJvamVjdCA9IGZ1bmN0aW9uIChwcm9qZWN0VGl0bGUpIHtcbiAgICBsZXQgbmV3UHJvamVjdCA9IHByb2plY3QocHJvamVjdFRpdGxlKTtcbiAgICBtZW1vcnkud3JpdGVQcm9qZWN0KG5ld1Byb2plY3QpO1xuICB9O1xuICBsZXQgZ2V0UHJvamVjdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG1lbW9yeS5nZXRQcm9qZWN0KCk7XG4gIH07XG4gIGxldCBjcmVhdGVUYXNrID0gZnVuY3Rpb24gKHRhc2tUaXRsZSwgcHJvamVjdFRpdGxlKSB7XG4gICAgbGV0IG5ld1Rhc2sgPSB0YXNrKHRhc2tUaXRsZSk7XG4gICAgbWVtb3J5LndyaXRlVGFzayhuZXdUYXNrLCBwcm9qZWN0VGl0bGUpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlUHJvamVjdCxcbiAgICBjcmVhdGVUYXNrLFxuICAgIGdldFByb2plY3RzLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgY29udHJvbCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY29tcGFyZUFzYywgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgY29udHJvbCB9IGZyb20gXCIuL2xvZ2ljXCJcbmltcG9ydCB7IG1lbW9yeSB9IGZyb20gXCIuL2RhdGFiYXNlXCI7XG5pbXBvcnQgeyBkaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiXG5cblxud2luZG93LmNvbnRyb2wgPSBjb250cm9sO1xud2luZG93Lm1lbW9yeSA9IG1lbW9yeTtcblxuZGlzcGxheS5jYWNoZURPTSgpO1xuZGlzcGxheS5idXR0b25MaXN0ZW5lcigpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBmb3JtYXQobmV3IERhdGUoMjAxNCwgMSwgMTEpLCAneXl5eS1NTS1kZCcpXG4vLyAvLz0+ICcyMDE0LTAyLTExJ1xuXG4vLyBjb25zdCBkYXRlcyA9IFtcbi8vICAgbmV3IERhdGUoMTk5NSwgNiwgMiksXG4vLyAgIG5ldyBEYXRlKDE5ODcsIDEsIDExKSxcbi8vICAgbmV3IERhdGUoMTk4OSwgNiwgMTApLFxuLy8gXVxuXG4vLyBkYXRlcy5zb3J0KGNvbXBhcmVBc2MpXG4vLyAvLz0+IFtcbi8vIC8vICAgV2VkIEZlYiAxMSAxOTg3IDAwOjAwOjAwLFxuLy8gLy8gICBNb24gSnVsIDEwIDE5ODkgMDA6MDA6MDAsXG4vLyAvLyAgIFN1biBKdWwgMDIgMTk5NSAwMDowMDowMFxuLy8gLy8gXVxuXG4vLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29sb3JTZXR0aW5nJywgJyNhNDUwOWInKTtcblxuLy8gY29uc29sZS5kaXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjb2xvclNldHRpbmdcIikpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==