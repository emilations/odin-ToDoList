/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "database": () => (/* binding */ database),
/* harmony export */   "project": () => (/* binding */ project),
/* harmony export */   "task": () => (/* binding */ task)
/* harmony export */ });
// TASK FACTORY FUNCTION---------------------------------------------------------------
let task = function(taskTitle, dueDate) {
  let data = {
    taskTitle,
    dueDate,
    done: false,
  }

  let edit = function() {
    console.log("e");
  }

  return {
    data,
    edit,
  }
}

// PROJECT MODULE -------------------------------------------------------------
let project = function() {
  let projectArray = [];

  let createProject = function(projectTitle) {
    projectArray.push({
    projectTitle,
    projectTasks: [],
    })
  }

  let addTask = function(projectTitle, task) {
    let findFunction = function(elem) {
      if(elem.projectTitle == projectTitle) {
        elem.projectTasks.push(task)
      }
    }
    projectArray.forEach(findFunction)
  }

  let read = function() {
    return [...projectArray]
  }

  return {
    createProject,
    addTask,
    read,
  }
}()

// DATABASE MODULE ------------------------------------------------------------
let database = function(){

  let write = function(obj) {
    localStorage.setItem("main", JSON.stringify(obj))
  }

  let read = function() {
    return JSON.parse(localStorage.getItem("main"));
  }

  let reset = function() {

  }

  return {
    write,
    read,
    reset,
  }
}()



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



window.task = _logic__WEBPACK_IMPORTED_MODULE_0__.task;
window.project = _logic__WEBPACK_IMPORTED_MODULE_0__.project;
window.database = _logic__WEBPACK_IMPORTED_MODULE_0__.database;



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7VUNyRUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ044QztBQUNJOztBQUVsRCxjQUFjLHdDQUFJO0FBQ2xCLGlCQUFpQiwyQ0FBTztBQUN4QixrQkFBa0IsNENBQVE7Ozs7QUFJMUI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRBU0sgRkFDVE9SWSBGVU5DVElPTi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IHRhc2sgPSBmdW5jdGlvbih0YXNrVGl0bGUsIGR1ZURhdGUpIHtcbiAgbGV0IGRhdGEgPSB7XG4gICAgdGFza1RpdGxlLFxuICAgIGR1ZURhdGUsXG4gICAgZG9uZTogZmFsc2UsXG4gIH1cblxuICBsZXQgZWRpdCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKFwiZVwiKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZGF0YSxcbiAgICBlZGl0LFxuICB9XG59XG5cbi8vIFBST0pFQ1QgTU9EVUxFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmxldCBwcm9qZWN0ID0gZnVuY3Rpb24oKSB7XG4gIGxldCBwcm9qZWN0QXJyYXkgPSBbXTtcblxuICBsZXQgY3JlYXRlUHJvamVjdCA9IGZ1bmN0aW9uKHByb2plY3RUaXRsZSkge1xuICAgIHByb2plY3RBcnJheS5wdXNoKHtcbiAgICBwcm9qZWN0VGl0bGUsXG4gICAgcHJvamVjdFRhc2tzOiBbXSxcbiAgICB9KVxuICB9XG5cbiAgbGV0IGFkZFRhc2sgPSBmdW5jdGlvbihwcm9qZWN0VGl0bGUsIHRhc2spIHtcbiAgICBsZXQgZmluZEZ1bmN0aW9uID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICAgaWYoZWxlbS5wcm9qZWN0VGl0bGUgPT0gcHJvamVjdFRpdGxlKSB7XG4gICAgICAgIGVsZW0ucHJvamVjdFRhc2tzLnB1c2godGFzaylcbiAgICAgIH1cbiAgICB9XG4gICAgcHJvamVjdEFycmF5LmZvckVhY2goZmluZEZ1bmN0aW9uKVxuICB9XG5cbiAgbGV0IHJlYWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gWy4uLnByb2plY3RBcnJheV1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlUHJvamVjdCxcbiAgICBhZGRUYXNrLFxuICAgIHJlYWQsXG4gIH1cbn0oKVxuXG4vLyBEQVRBQkFTRSBNT0RVTEUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgZGF0YWJhc2UgPSBmdW5jdGlvbigpe1xuXG4gIGxldCB3cml0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwibWFpblwiLCBKU09OLnN0cmluZ2lmeShvYmopKVxuICB9XG5cbiAgbGV0IHJlYWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm1haW5cIikpO1xuICB9XG5cbiAgbGV0IHJlc2V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd3JpdGUsXG4gICAgcmVhZCxcbiAgICByZXNldCxcbiAgfVxufSgpXG5cbmV4cG9ydCB7IHRhc2ssIHByb2plY3QsIGRhdGFiYXNlIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbXBhcmVBc2MsIGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IHRhc2ssIHByb2plY3QsIGRhdGFiYXNlIH0gZnJvbSAnLi9sb2dpYyc7XG5cbndpbmRvdy50YXNrID0gdGFzaztcbndpbmRvdy5wcm9qZWN0ID0gcHJvamVjdDtcbndpbmRvdy5kYXRhYmFzZSA9IGRhdGFiYXNlO1xuXG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG4vLyBmb3JtYXQobmV3IERhdGUoMjAxNCwgMSwgMTEpLCAneXl5eS1NTS1kZCcpXG4vLyAvLz0+ICcyMDE0LTAyLTExJ1xuXG4vLyBjb25zdCBkYXRlcyA9IFtcbi8vICAgbmV3IERhdGUoMTk5NSwgNiwgMiksXG4vLyAgIG5ldyBEYXRlKDE5ODcsIDEsIDExKSxcbi8vICAgbmV3IERhdGUoMTk4OSwgNiwgMTApLFxuLy8gXVxuXG4vLyBkYXRlcy5zb3J0KGNvbXBhcmVBc2MpXG4vLyAvLz0+IFtcbi8vIC8vICAgV2VkIEZlYiAxMSAxOTg3IDAwOjAwOjAwLFxuLy8gLy8gICBNb24gSnVsIDEwIDE5ODkgMDA6MDA6MDAsXG4vLyAvLyAgIFN1biBKdWwgMDIgMTk5NSAwMDowMDowMFxuLy8gLy8gXVxuXG4vLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29sb3JTZXR0aW5nJywgJyNhNDUwOWInKTtcblxuLy8gY29uc29sZS5kaXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjb2xvclNldHRpbmdcIikpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==