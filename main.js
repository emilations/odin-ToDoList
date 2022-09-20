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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0Ly4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9mYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9odG1sQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sQ3JlYXRvciB9IGZyb20gXCIuL2h0bWxDcmVhdG9yXCI7XG5pbXBvcnQgeyBjb250cm9sIH0gZnJvbSBcIi4vbG9naWNcIjtcblxubGV0IGRpc3BsYXkgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgcHJvamVjdEFkZEJ1dHRvbjtcbiAgbGV0IHRhc2tBZGRCdXR0b247XG4gIGxldCBwcm9qZWN0Q29udGFpbmVyO1xuICBsZXQgdGFza0NvbnRhaW5lcjtcbiAgbGV0IHNlbGVjdGVkUHJvamVjdCA9IDA7XG4gIGxldCBzZWxlY3RlZFRhc2sgPSAwO1xuXG4gIGZ1bmN0aW9uIGNhY2hlRE9NKCkge1xuICAgIHByb2plY3RBZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtYWRkXCIpO1xuICAgIHRhc2tBZGRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stYWRkXCIpO1xuICAgIHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3Qtc2VsZWN0b3JcIik7XG4gICAgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1zZWxlY3RvclwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1dHRvbkxpc3RlbmVyKCkge1xuICAgIHByb2plY3RBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZVByb2plY3QpO1xuICAgIHRhc2tBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZVRhc2spO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9wdWxhdGVQcm9qZWN0cygpIHtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbGV0IHByb2plY3RMaXN0ID0gY29udHJvbC5nZXRQcm9qZWN0cygpO1xuICAgIHByb2plY3RMaXN0LmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKFxuICAgICAgICBodG1sQ3JlYXRvci5wcm9qZWN0KGluZGV4LCBlbGVtLnByb2plY3QudGl0bGUpXG4gICAgICApO1xuICAgIH0pO1xuICAgIGxldCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtZGF0YVwiKVtzZWxlY3RlZFByb2plY3RdO1xuICAgIGlmICghYWN0aXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGFjdGl2ZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1lbnRyeS1hY3RpdmVcIik7XG4gICAgYWN0aXZlLmNoaWxkTm9kZXNbMV0uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtZWRpdC05Ni1hY3RpdmUucG5nXCI7XG4gICAgYWN0aXZlLmNoaWxkTm9kZXNbMl0uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtdHJhc2gtOTYtYWN0aXZlLnN2Z1wiO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9wdWxhdGVUYXNrcygpIHtcbiAgICB0YXNrQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgaWYgKGNvbnRyb2wuZ2V0UHJvamVjdHMoKS5sZW5ndGggPT0gMCkge1xuICAgICAgc2VsZWN0ZWRQcm9qZWN0ID0gMDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHRhc2tMaXN0ID0gY29udHJvbC5nZXRQcm9qZWN0cygpW3NlbGVjdGVkUHJvamVjdF0ucHJvamVjdC50YXNrcztcbiAgICB0YXNrTGlzdC5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGVudHJ5ID0gaHRtbENyZWF0b3IudGFzayhpbmRleCwgZWxlbS50aXRsZSwgZWxlbS5kdWVEYXRlKTtcbiAgICAgIGlmIChlbGVtLmRvbmUpIHtcbiAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZChcInRhc2stY29tcGxldGVkXCIpXG4gICAgICAgIGVudHJ5LmNoaWxkTm9kZXNbMF0uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtY2hlY2ttYXJrX2NoZWNrZWQtOTYucG5nXCI7XG4gICAgICAgIGVudHJ5LmNoaWxkTm9kZXNbM10uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtZWRpdC05Ni5wbmdcIjtcbiAgICAgICAgZW50cnkuY2hpbGROb2Rlc1s0XS5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC10cmFzaC05Ni1ub25hY3RpdmUuc3ZnXCI7XG4gICAgICB9XG4gICAgICB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGVudHJ5KTtcbiAgICB9KTtcbiAgICBsZXQgYWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLWRhdGFcIilbc2VsZWN0ZWRUYXNrXTtcbiAgICBpZiAoIWFjdGl2ZSkge3JldHVybn1cbiAgICBhY3RpdmUuY2xhc3NMaXN0LmFkZChcInRhc2stZW50cnktYWN0aXZlXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdChlKSB7XG4gICAgY29udHJvbC5jcmVhdGVQcm9qZWN0KCk7XG4gICAgcmVmcmVzaCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVGFzayhlKSB7XG4gICAgY29udHJvbC5jcmVhdGVUYXNrKHNlbGVjdGVkUHJvamVjdCk7XG4gICAgcmVmcmVzaCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuUHJvamVjdCgpIHtcbiAgICBsZXQgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtZGF0YVwiKTtcbiAgICBwcm9qZWN0cy5mb3JFYWNoKChlbGVtKSA9PlxuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09IFwiZGVsZXRlUHJvamVjdFwiKSB7XG4gICAgICAgICAgZGVsZXRlUHJvamVjdChlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmlkID09IFwiZWRpdFByb2plY3RcIikge1xuICAgICAgICAgIHByb2plY3RBY3RpdmUoZS50YXJnZXQuZGF0YXNldC5jb3VudGVyKTtcbiAgICAgICAgICBsaXN0ZW5Qcm9qZWN0VGl0bGVNb2QoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvamVjdEFjdGl2ZShlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5UYXNrKCkge1xuICAgIGxldCB0YXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGFzay1kYXRhXCIpO1xuICAgIHRhc2tzLmZvckVhY2goKGVsZW0pID0+XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT0gXCJkZWxldGVUYXNrXCIpIHtcbiAgICAgICAgICBkZWxldGVUYXNrKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcik7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaWQgPT0gXCJlZGl0VGFza1wiKSB7XG4gICAgICAgICAgdGFza0FjdGl2ZShlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIpO1xuICAgICAgICAgIGxpc3RlblRhc2tNb2QoZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaWQgPT0gXCJ0YXNrLWNvbXBsZXRlXCIpIHtcbiAgICAgICAgICB0YXNrQWN0aXZlKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcik7XG4gICAgICAgICAgdGFza0NvbXBsZXRlKGUpO1xuICAgICAgICAgIHJlZnJlc2goKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXNrQWN0aXZlKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRhc2tBY3RpdmUoY291bnRlcikge1xuICAgIHNlbGVjdGVkVGFzayA9IGNvdW50ZXI7XG4gICAgcmVmcmVzaCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJvamVjdEFjdGl2ZShjb3VudGVyKSB7XG4gICAgc2VsZWN0ZWRQcm9qZWN0ID0gY291bnRlcjtcbiAgICByZWZyZXNoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVUYXNrKHRhc2tDb3VudGVyKSB7XG4gICAgbGV0IG5ld1NpemUgPSBjb250cm9sLmRlbGV0ZVRhc2sodGFza0NvdW50ZXIsIHNlbGVjdGVkUHJvamVjdCkgLSAxO1xuICAgIGNvbnNvbGUubG9nKG5ld1NpemUpO1xuICAgIGlmIChzZWxlY3RlZFRhc2sgPiBuZXdTaXplKSB7XG4gICAgICBzZWxlY3RlZFRhc2sgPSBzZWxlY3RlZFRhc2sgLSAxO1xuICAgIH1cbiAgICByZWZyZXNoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVQcm9qZWN0KGNvdW50ZXIpIHtcbiAgICBsZXQgbmV3U2l6ZSA9IGNvbnRyb2wuZGVsZXRlUHJvamVjdChjb3VudGVyKSAtIDE7XG4gICAgaWYgKHNlbGVjdGVkUHJvamVjdCA+IG5ld1NpemUpIHtcbiAgICAgIHNlbGVjdGVkUHJvamVjdCA9IHNlbGVjdGVkUHJvamVjdCAtIDE7XG4gICAgfVxuICAgIHJlZnJlc2goKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlblRhc2tNb2QoZSkge1xuICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcjtcbiAgICBsZXQgdGFza0VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRhc2stZW50cnlbZGF0YS1jb3VudGVyPVwiJHtpbmRleH1cIl1gKTtcbiAgICBsZXQgdGFza05hbWUgPSB0YXNrRW50cnkuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudDtcbiAgICBsZXQgdGFza0RhdGUgPSB0YXNrRW50cnkuY2hpbGROb2Rlc1syXS50ZXh0Q29udGVudDtcbiAgICBsZXQgaW5wdXQgPSBodG1sQ3JlYXRvci50YXNrTW9kKGluZGV4LCB0YXNrTmFtZSwgdGFza0RhdGUpO1xuICAgIHRhc2tFbnRyeS5yZXBsYWNlV2l0aChpbnB1dCk7XG4gICAgXG4gICAgbGV0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLWRhdGFcIik7XG4gICAgdGFza3NbaW5kZXhdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT0gXCJkZWxldGVUYXNrXCIpIHtcbiAgICAgICAgICBkZWxldGVUYXNrKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcik7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaWQgPT0gXCJ0YXNrLWNvbXBsZXRlXCIpIHtcbiAgICAgICAgICB0YXNrQ29tcGxldGUoZSk7XG4gICAgICAgICAgcmVmcmVzaCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICBcbiAgICBsZXQgZG9uZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtpZD1cImRvbmVNb2RpZmljYXRpb25UYXNrXCJdW2RhdGEtY291bnRlcj1cIiR7aW5kZXh9XCJdYCk7XG4gICAgZG9uZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGxldCBuZXdOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC10YXNrLW5hbWVcIikudmFsdWU7XG4gICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGF0ZS1pbnB1dFwiKS52YWx1ZTtcbiAgICAgIGNvbnRyb2wubW9kaWZ5VGFzayhpbmRleCwgc2VsZWN0ZWRQcm9qZWN0LCBuZXdOYW1lLCB0YXNrRGF0ZSk7XG4gICAgICByZWZyZXNoKCk7XG4gICAgfSk7XG5cbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgIGxldCBuZXdOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC10YXNrLW5hbWVcIikudmFsdWU7XG4gICAgICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kYXRlLWlucHV0XCIpLnZhbHVlO1xuICAgICAgICBjb250cm9sLm1vZGlmeVRhc2soaW5kZXgsIHNlbGVjdGVkUHJvamVjdCwgbmV3TmFtZSwgdGFza0RhdGUpO1xuICAgICAgICByZWZyZXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5Qcm9qZWN0VGl0bGVNb2QoZSkge1xuICAgIGxldCBpbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcjtcbiAgICBsZXQgcHJvamVjdEVudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGAucHJvamVjdC1lbnRyeVtkYXRhLWNvdW50ZXI9XCIke2luZGV4fVwiXWBcbiAgICApO1xuICAgIGxldCBwcm9qZWN0TmFtZSA9IHByb2plY3RFbnRyeS5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50O1xuICAgIGxldCBpbnB1dCA9IGh0bWxDcmVhdG9yLnByb2plY3RNb2QoaW5kZXgsIHByb2plY3ROYW1lKTtcbiAgICBwcm9qZWN0RW50cnkucmVwbGFjZVdpdGgoaW5wdXQpO1xuXG4gICAgbGV0IGRvbmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYFtpZD1cImRvbmVNb2RpZmljYXRpb25Qcm9qZWN0XCJdW2RhdGEtY291bnRlcj1cIiR7aW5kZXh9XCJdYFxuICAgICk7XG4gICAgZG9uZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGxldCBuZXdOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC1wcm9qZWN0LW5hbWVcIikudmFsdWU7XG4gICAgICBjb250cm9sLm1vZGlmeVByb2plY3QoaW5kZXgsIG5ld05hbWUpO1xuICAgICAgcmVmcmVzaCgpO1xuICAgIH0pO1xuXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICBsZXQgbmV3TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXQtcHJvamVjdC1uYW1lXCIpLnZhbHVlO1xuICAgICAgICBjb250cm9sLm1vZGlmeVByb2plY3QoaW5kZXgsIG5ld05hbWUpO1xuICAgICAgICByZWZyZXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB0YXNrQ29tcGxldGUoZSkge1xuICAgIGNvbnRyb2wudGFza0NvbXBsZXRlKGUsIHNlbGVjdGVkUHJvamVjdCk7XG4gIH1cblxuICBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgIGNhY2hlRE9NKCk7XG4gICAgYnV0dG9uTGlzdGVuZXIoKTtcbiAgICBwb3B1bGF0ZVByb2plY3RzKCk7XG4gICAgcG9wdWxhdGVUYXNrcygpO1xuICAgIGxpc3RlblByb2plY3QoKTtcbiAgICBsaXN0ZW5UYXNrKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNhY2hlRE9NLFxuICAgIGJ1dHRvbkxpc3RlbmVyLFxuICAgIHJlZnJlc2gsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBkaXNwbGF5IH07XG4iLCIvLyBQUk9KRUNUIEZBQ1RPUlkgRlVOQ1RJT04gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgcHJvamVjdEZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgcmV0dXJuIHtcbiAgICBwcm9qZWN0OiB7XG4gICAgICB0aXRsZSxcbiAgICAgIHRhc2tzOiBbXSxcbiAgICB9LFxuICAgIGFkZFRhc2s6IGZ1bmN0aW9uIChuZXdUYXNrKSB7XG4gICAgICB0aGlzLnByb2plY3QudGFza3MucHVzaChuZXdUYXNrKVxuICAgIH0sXG4gIH07XG59O1xuXG4vLyBUQVNLIEZBQ1RPUlkgRlVOQ1RJT04tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgdGFza0ZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0aXRsZSxcbiAgICBkdWVEYXRlOiBcIlwiLFxuICAgIGRvbmU6IGZhbHNlLFxuICB9Oztcbn07XG5cbmV4cG9ydCB7IHByb2plY3RGYWN0b3J5LCB0YXNrRmFjdG9yeSB9IiwiLy8gQ1JFQVRFIFRIRSBIVE1MIEZPUiBUSEUgUFJPSkVDVCBFTlRSWSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IGh0bWxDcmVhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IHByb2plY3QgPSBmdW5jdGlvbiAoaW5kZXgsIHRpdGxlKSB7XG4gICAgbGV0IHByb2plY3RFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdEVudHJ5LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVudHJ5XCIsIFwicHJvamVjdC1kYXRhXCIpO1xuICAgIHByb2plY3RFbnRyeS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuXG4gICAgbGV0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgIHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5hbWVcIik7XG4gICAgcHJvamVjdE5hbWUuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcblxuICAgIGxldCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJlZGl0UHJvamVjdFwiKTtcbiAgICBlZGl0SWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1lZGl0LTk2LnBuZ1wiO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZWRpdEljb24uYWx0ID0gXCJFZGl0IEljb25cIjtcblxuICAgIGxldCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGVsZXRlUHJvamVjdFwiKTtcbiAgICBkZWxldGVJY29uLnNyYyA9IFwiL2Fzc2V0cy9pY29uczgtdHJhc2gtOTYtbm9uYWN0aXZlLnN2Z1wiO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBkZWxldGVJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIHByb2plY3RFbnRyeS5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG4gICAgcHJvamVjdEVudHJ5LmFwcGVuZENoaWxkKGVkaXRJY29uKTtcbiAgICBwcm9qZWN0RW50cnkuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG5cbiAgICByZXR1cm4gcHJvamVjdEVudHJ5O1xuICB9O1xuXG4gIC8vIENSRUFURSBUSEUgSFRNTCBGT1IgVEhFIFBST0pFQ1QgRU5UUlkgTU9ESUZJQ0FUSU9OXG5cbiAgbGV0IHByb2plY3RNb2QgPSBmdW5jdGlvbiAoaW5kZXgsIHRpdGxlKSB7XG4gICAgbGV0IHByb2plY3RFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdEVudHJ5LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVudHJ5XCIsIFwicHJvamVjdC1kYXRhXCIsIFwicHJvamVjdC1lbnRyeS1hY3RpdmVcIik7XG4gICAgcHJvamVjdEVudHJ5LnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG5cbiAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChcImlucHV0LXByb2plY3QtbmFtZVwiKVxuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgaW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgIGlucHV0LnZhbHVlID0gdGl0bGU7XG5cbiAgICBsZXQgZG9uZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGRvbmVJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZG9uZU1vZGlmaWNhdGlvblByb2plY3RcIik7XG4gICAgZG9uZUljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtZG9uZS05Ni5wbmdcIjtcbiAgICBkb25lSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGRvbmVJY29uLmFsdCA9IFwiRG9uZSBJY29uXCI7XG5cbiAgICBsZXQgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRlbGV0ZVByb2plY3RcIik7XG4gICAgZGVsZXRlSWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC10cmFzaC05Ni1hY3RpdmUuc3ZnXCI7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGRlbGV0ZUljb24uYWx0ID0gXCJkZWxldGUgSWNvblwiO1xuXG4gICAgcHJvamVjdEVudHJ5LmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICBwcm9qZWN0RW50cnkuYXBwZW5kQ2hpbGQoZG9uZUljb24pO1xuICAgIHByb2plY3RFbnRyeS5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcblxuICAgIHJldHVybiBwcm9qZWN0RW50cnk7XG4gIH07XG5cbiAgLy8gQ1JFQVRFIFRIRSBIVE1MIEZPUiBUSEUgVEFTSyBFTlRSWSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBsZXQgdGFzayA9IGZ1bmN0aW9uIChpbmRleCwgdGl0bGUsIGRhdGUpIHtcbiAgICBsZXQgdGFza0VudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRW50cnkuY2xhc3NMaXN0LmFkZChcInRhc2stZW50cnlcIiwgXCJ0YXNrLWRhdGFcIik7XG4gICAgdGFza0VudHJ5LnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG5cbiAgICBsZXQgY2hlY2ttYXJrSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgY2hlY2ttYXJrSWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1jaGVja21hcmtfdW5jaGVja2VkLTk2LnBuZ1wiO1xuICAgIGNoZWNrbWFya0ljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0YXNrLWNvbXBsZXRlXCIpXG4gICAgY2hlY2ttYXJrSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGNoZWNrbWFya0ljb24uYWx0ID0gXCJkZWxldGUgSWNvblwiO1xuXG4gICAgbGV0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgIHRhc2tOYW1lLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLW5hbWVcIik7XG4gICAgdGFza05hbWUuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcblxuICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tEYXRlLnRleHRDb250ZW50ID0gZGF0ZTtcbiAgICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWRhdGUnKVxuICAgIHRhc2tEYXRlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwidGFzay1kYXRlXCIpO1xuXG4gICAgbGV0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImVkaXRUYXNrXCIpO1xuICAgIGVkaXRJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWVkaXQtOTYtYWN0aXZlLnBuZ1wiO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZWRpdEljb24uYWx0ID0gXCJFZGl0IEljb25cIjtcblxuICAgIGxldCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGVsZXRlVGFza1wiKTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZGVsZXRlSWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC10cmFzaC05Ni1hY3RpdmUuc3ZnXCI7XG4gICAgZGVsZXRlSWNvbi5hbHQgPSBcImRlbGV0ZSBJY29uXCI7XG5cbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQoY2hlY2ttYXJrSWNvbik7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZChlZGl0SWNvbik7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuXG4gICAgcmV0dXJuIHRhc2tFbnRyeTtcbiAgfTtcblxuICBsZXQgdGFza01vZCA9IGZ1bmN0aW9uIChpbmRleCwgdGl0bGUsIGRhdGUpIHtcbiAgICBsZXQgdGFza0VudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRW50cnkuY2xhc3NMaXN0LmFkZChcInRhc2stZW50cnlcIiwgXCJ0YXNrLWRhdGFcIiwgXCJ0YXNrLWVudHJ5LWFjdGl2ZVwiKTtcbiAgICB0YXNrRW50cnkuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcblxuICAgIGxldCBjaGVja21hcmtJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBjaGVja21hcmtJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwidGFzay1jb21wbGV0ZVwiKVxuICAgIGNoZWNrbWFya0ljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBjaGVja21hcmtJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWNoZWNrbWFya191bmNoZWNrZWQtOTYucG5nXCI7XG4gICAgY2hlY2ttYXJrSWNvbi5hbHQgPSBcImRlbGV0ZSBJY29uXCI7XG5cbiAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChcImlucHV0LXRhc2stbmFtZVwiKVxuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgaW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgIGlucHV0LnZhbHVlID0gdGl0bGU7XG5cbiAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdGFza0RhdGUudHlwZSA9IFwiZGF0ZVwiO1xuICAgIHRhc2tEYXRlLnZhbHVlID0gZGF0ZTtcbiAgICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKFwidGFzay1kYXRlXCIpO1xuICAgIHRhc2tEYXRlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwidGFzay1kYXRlLWlucHV0XCIpO1xuXG4gICAgbGV0IGRvbmVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkb25lSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRvbmVNb2RpZmljYXRpb25UYXNrXCIpO1xuICAgIGRvbmVJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWRvbmUtOTYucG5nXCI7XG4gICAgZG9uZUljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBkb25lSWNvbi5hbHQgPSBcIkRvbmUgSWNvblwiO1xuXG4gICAgbGV0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkZWxldGVUYXNrXCIpO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBkZWxldGVJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LXRyYXNoLTk2LWFjdGl2ZS5zdmdcIjtcbiAgICBkZWxldGVJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZChjaGVja21hcmtJY29uKTtcbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGRvbmVJY29uKTtcbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG5cbiAgICByZXR1cm4gdGFza0VudHJ5O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcHJvamVjdCxcbiAgICBwcm9qZWN0TW9kLFxuICAgIHRhc2ssXG4gICAgdGFza01vZCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IGh0bWxDcmVhdG9yIH07IiwiaW1wb3J0IHsgcHJvamVjdEZhY3RvcnksIHRhc2tGYWN0b3J5IH0gZnJvbSBcIi4vZmFjdG9yaWVzXCI7XG5pbXBvcnQgeyBtZW1vcnkgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbmxldCBjb250cm9sID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IG5ld1Byb2plY3QgPSBwcm9qZWN0RmFjdG9yeSgpO1xuICAgIGxldCBjb3VudGVyID0gbWVtb3J5LmFkZFByb2plY3QobmV3UHJvamVjdCkgLSAxO1xuICAgIGxldCBwcm9qZWN0TmFtZSA9IGBOZXcgcHJvamVjdGA7XG4gICAgbW9kaWZ5UHJvamVjdChjb3VudGVyLCBwcm9qZWN0TmFtZSk7XG4gICAgcmV0dXJuIGNvdW50ZXI7IC8vcmV0dXJucyBuZXcgcHJvamVjdCBpbmRleFxuICB9O1xuXG4gIGxldCBjcmVhdGVUYXNrID0gZnVuY3Rpb24gKGluZGV4UHJvamVjdCkge1xuICAgIGxldCBuZXdUYXNrID0gdGFza0ZhY3RvcnkoKTtcbiAgICBsZXQgY291bnRlciA9IG1lbW9yeS5hZGRUYXNrKGluZGV4UHJvamVjdCwgbmV3VGFzaykgLSAxO1xuICAgIGxldCB0YXNrTmFtZSA9IGBOZXcgdGFza2A7XG4gICAgbW9kaWZ5VGFzayhjb3VudGVyLCBpbmRleFByb2plY3QsIHRhc2tOYW1lKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcblxuICBsZXQgZGVsZXRlVGFzayA9IGZ1bmN0aW9uIChpbmRleFRhc2ssIGluZGV4UHJvamVjdCkge1xuICAgIHJldHVybiBtZW1vcnkuZGVsZXRlVGFzayhpbmRleFRhc2ssIGluZGV4UHJvamVjdCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbW9kaWZ5UHJvamVjdChpbmRleFByb2plY3QsIHRpdGxlKSB7XG4gICAgbWVtb3J5LmVkaXRQcm9qZWN0KGluZGV4UHJvamVjdCwgdGl0bGUpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1vZGlmeVRhc2soY291bnRlciwgaW5kZXhQcm9qZWN0LCB0YXNrTmFtZSwgdGFza0RhdGUpIHtcbiAgICBtZW1vcnkuZWRpdFRhc2soY291bnRlciwgaW5kZXhQcm9qZWN0LCB0YXNrTmFtZSwgdGFza0RhdGUpO1xuICB9O1xuXG4gIGxldCBnZXRQcm9qZWN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbWVtb3J5LmdldFByb2plY3QoKTtcbiAgfTtcblxuICBmdW5jdGlvbiBkZWxldGVQcm9qZWN0KGluZGV4UHJvamVjdCkge1xuICAgIHJldHVybiBtZW1vcnkuZGVsZXRlUHJvamVjdChpbmRleFByb2plY3QpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHRhc2tDb21wbGV0ZShlLCBzZWxlY3RlZFByb2plY3QpIHtcbiAgICBtZW1vcnkuY29tcGxldGVUYXNrVG9nZ2xlKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlciwgc2VsZWN0ZWRQcm9qZWN0KTtcbiAgfTtcblxuICBpZiAoIW1lbW9yeS5jaGVja0lmU3RvcmFnZSgpKXtcbiAgICBjcmVhdGVQcm9qZWN0KCk7XG4gIH0gZWxzZSB7XG4gICAgbWVtb3J5LnJldHJpZXZlRnJvbVN0b3JhZ2UoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlUHJvamVjdCxcbiAgICBjcmVhdGVUYXNrLFxuICAgIGRlbGV0ZVRhc2ssXG4gICAgbW9kaWZ5UHJvamVjdCxcbiAgICBnZXRQcm9qZWN0cyxcbiAgICBkZWxldGVQcm9qZWN0LFxuICAgIG1vZGlmeVRhc2ssXG4gICAgdGFza0NvbXBsZXRlLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgY29udHJvbCB9O1xuIiwiaW1wb3J0IHsgc2V0IH0gZnJvbSBcImRhdGUtZm5zXCI7XG5cbi8vIE1FTU9SWSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmxldCBtZW1vcnkgPSAoZnVuY3Rpb24gKCkge1xuICBsZXQgcHJvamVjdHMgPSBbXTtcblxuICBsZXQgYWRkUHJvamVjdCA9IGZ1bmN0aW9uIChwcm9qZWN0KSB7XG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICBzYXZlVG9TdG9yYWdlKCk7XG4gICAgcmV0dXJuIGdldFByb2plY3RDb3VudGVyKCk7XG4gIH07XG5cbiAgbGV0IGFkZFRhc2sgPSBmdW5jdGlvbiAoaW5kZXhQcm9qZWN0LCB0YXNrKSB7XG4gICAgcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5hZGRUYXNrKHRhc2spO1xuICAgIHNhdmVUb1N0b3JhZ2UoKTtcbiAgICByZXR1cm4gZ2V0VGFza0NvdW50ZXIoaW5kZXhQcm9qZWN0KTtcbiAgfTtcblxuICBsZXQgZ2V0UHJvamVjdENvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByb2plY3RzLmxlbmd0aDtcbiAgfTtcblxuICBsZXQgZ2V0VGFza0NvdW50ZXIgPSBmdW5jdGlvbiAoaW5kZXhQcm9qZWN0KSB7XG4gICAgcmV0dXJuIHByb2plY3RzW2luZGV4UHJvamVjdF0ucHJvamVjdC50YXNrcy5sZW5ndGg7XG4gIH07XG5cbiAgbGV0IGdldFByb2plY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFsuLi5wcm9qZWN0c107XG4gIH07XG5cbiAgbGV0IGRlbGV0ZVRhc2sgPSBmdW5jdGlvbiAoaW5kZXhUYXNrLCBpbmRleFByb2plY3QpIHtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3Muc3BsaWNlKGluZGV4VGFzaywgMSk7XG4gICAgc2F2ZVRvU3RvcmFnZSgpO1xuICAgIHJldHVybiBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3MubGVuZ3RoO1xuICB9O1xuXG4gIGxldCBlZGl0UHJvamVjdCA9IGZ1bmN0aW9uIChpbmRleFByb2plY3QsIHRpdGxlKSB7XG4gICAgcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRpdGxlID0gdGl0bGU7XG4gICAgc2F2ZVRvU3RvcmFnZSgpO1xuICB9O1xuXG4gIGxldCBlZGl0VGFzayA9IGZ1bmN0aW9uIChpbmRleFRhc2ssIGluZGV4UHJvamVjdCwgdGl0bGUsIHRhc2tEYXRlKSB7XG4gICAgcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzW2luZGV4VGFza10udGl0bGUgPSB0aXRsZTtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3NbaW5kZXhUYXNrXS5kdWVEYXRlID0gdGFza0RhdGU7XG4gICAgc2F2ZVRvU3RvcmFnZSgpO1xuICB9O1xuXG4gIGxldCBjb21wbGV0ZVRhc2tUb2dnbGUgPSBmdW5jdGlvbiAoaW5kZXhUYXNrLCBpbmRleFByb2plY3QpIHtcbiAgICBpZiAocHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzW2luZGV4VGFza10uZG9uZSkge1xuICAgICAgcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzW2luZGV4VGFza10uZG9uZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3NbaW5kZXhUYXNrXS5kb25lID0gdHJ1ZTtcbiAgICB9XG4gICAgc2F2ZVRvU3RvcmFnZSgpO1xuICB9O1xuXG4gIGxldCBkZWxldGVQcm9qZWN0ID0gZnVuY3Rpb24gKGluZGV4UHJvamVjdCkge1xuICAgIHByb2plY3RzLnNwbGljZShpbmRleFByb2plY3QsIDEpO1xuICAgIHNhdmVUb1N0b3JhZ2UoKTtcbiAgICByZXR1cm4gcHJvamVjdHMubGVuZ3RoO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgcHJvamVjdHMgPSBbXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmVUb1N0b3JhZ2UoKXtcbiAgICBkYXRhYmFzZS5zZXQoZ2V0UHJvamVjdCgpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJldHJpZXZlRnJvbVN0b3JhZ2UoKXtcbiAgICBsZXQgdGVtcCA9IGRhdGFiYXNlLnJlYWQoKTtcbiAgICB0ZW1wLmZvckVhY2goKGVsZW0pID0+IGVsZW0uYWRkVGFzayA9IGZ1bmN0aW9uIChuZXdUYXNrKSB7XG4gICAgICB0aGlzLnByb2plY3QudGFza3MucHVzaChuZXdUYXNrKVxuICAgIH0sKVxuICAgIHByb2plY3RzID0gIFsuLi50ZW1wXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrSWZTdG9yYWdlKCl7XG4gICAgcmV0dXJuIGRhdGFiYXNlLnJlYWQoKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRQcm9qZWN0LFxuICAgIGFkZFRhc2ssXG4gICAgZ2V0UHJvamVjdENvdW50ZXIsXG4gICAgZ2V0VGFza0NvdW50ZXIsXG4gICAgZ2V0UHJvamVjdCxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBlZGl0VGFzayxcbiAgICBkZWxldGVUYXNrLFxuICAgIGRlbGV0ZVByb2plY3QsXG4gICAgY29tcGxldGVUYXNrVG9nZ2xlLFxuICAgIHJldHJpZXZlRnJvbVN0b3JhZ2UsXG4gICAgY2hlY2tJZlN0b3JhZ2UsXG4gIH07XG59KSgpO1xuXG4vLyBEQVRBQkFTRSBNT0RVTEUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5sZXQgZGF0YWJhc2UgPSAoZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIHNldChvYmopIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIm1haW5cIiwgSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVhZCgpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm1haW5cIikpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc2V0LFxuICAgIHJlYWQsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBtZW1vcnkgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY29tcGFyZUFzYywgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHsgY29udHJvbCB9IGZyb20gXCIuL2xvZ2ljXCJcbmltcG9ydCB7IG1lbW9yeSB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcbmltcG9ydCB7IGRpc3BsYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCJcblxuXG53aW5kb3cuY29udHJvbCA9IGNvbnRyb2w7XG53aW5kb3cubWVtb3J5ID0gbWVtb3J5O1xuXG5kaXNwbGF5LnJlZnJlc2goKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==