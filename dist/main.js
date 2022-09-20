/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/getDaysInMonth/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/getDaysInMonth/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDaysInMonth)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name getDaysInMonth
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the number of days in a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // How many days are in February 2000?
 * const result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */

function getDaysInMonth(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/set/index.js":
/*!************************************************!*\
  !*** ./node_modules/date-fns/esm/set/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ set)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _setMonth_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../setMonth/index.js */ "./node_modules/date-fns/esm/setMonth/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");





/**
 * @name set
 * @category Common Helpers
 * @summary Set date values to a given date.
 *
 * @description
 * Set date values to a given date.
 *
 * Sets time values to date from object `values`.
 * A value is not set if it is undefined or null or doesn't exist in `values`.
 *
 * Note about bundle size: `set` does not internally use `setX` functions from date-fns but instead opts
 * to use native `Date#setX` methods. If you use this function, you may not want to include the
 * other `setX` functions that date-fns provides if you are concerned about the bundle size.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Object} values - an object with options
 * @param {Number} [values.year] - the number of years to be set
 * @param {Number} [values.month] - the number of months to be set
 * @param {Number} [values.date] - the number of days to be set
 * @param {Number} [values.hours] - the number of hours to be set
 * @param {Number} [values.minutes] - the number of minutes to be set
 * @param {Number} [values.seconds] - the number of seconds to be set
 * @param {Number} [values.milliseconds] - the number of milliseconds to be set
 * @returns {Date} the new date with options set
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `values` must be an object
 *
 * @example
 * // Transform 1 September 2014 into 20 October 2015 in a single line:
 * const result = set(new Date(2014, 8, 20), { year: 2015, month: 9, date: 20 })
 * //=> Tue Oct 20 2015 00:00:00
 *
 * @example
 * // Set 12 PM to 1 September 2014 01:23:45 to 1 September 2014 12:00:00:
 * const result = set(new Date(2014, 8, 1, 1, 23, 45), { hours: 12 })
 * //=> Mon Sep 01 2014 12:23:45
 */
function set(dirtyDate, values) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);

  if (typeof values !== 'object' || values === null) {
    throw new RangeError('values parameter must be an object');
  }

  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate); // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date

  if (isNaN(date.getTime())) {
    return new Date(NaN);
  }

  if (values.year != null) {
    date.setFullYear(values.year);
  }

  if (values.month != null) {
    date = (0,_setMonth_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(date, values.month);
  }

  if (values.date != null) {
    date.setDate((0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(values.date));
  }

  if (values.hours != null) {
    date.setHours((0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(values.hours));
  }

  if (values.minutes != null) {
    date.setMinutes((0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(values.minutes));
  }

  if (values.seconds != null) {
    date.setSeconds((0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(values.seconds));
  }

  if (values.milliseconds != null) {
    date.setMilliseconds((0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(values.milliseconds));
  }

  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/setMonth/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/esm/setMonth/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setMonth)
/* harmony export */ });
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _getDaysInMonth_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../getDaysInMonth/index.js */ "./node_modules/date-fns/esm/getDaysInMonth/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");




/**
 * @name setMonth
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} month - the month of the new date
 * @returns {Date} the new date with the month set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set February to 1 September 2014:
 * const result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */

function setMonth(dirtyDate, dirtyMonth) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  var month = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = (0,_getDaysInMonth_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dateWithDesiredMonth); // Set the last day of the new month
  // if the original date was the last day of the longer month

  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

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
/* harmony export */   "memory": () => (/* binding */ memory)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/set/index.js");


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
    (0,date_fns__WEBPACK_IMPORTED_MODULE_0__["default"])(getProject());
  }

  function retrieveFromStorage(){
    console.log(database.read())

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxvREFBRztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVpQjs7Ozs7OztVQzFHbEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ2I7QUFDRTtBQUNBOzs7QUFHbkMsaUJBQWlCLDJDQUFPO0FBQ3hCLGdCQUFnQiw0Q0FBTTs7QUFFdEIscURBQWUsRSIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvdG9JbnRlZ2VyL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2dldERheXNJbk1vbnRoL2luZGV4LmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL3NldC9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9zZXRNb250aC9pbmRleC5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS90b0RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvZmFjdG9yaWVzLmpzIiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvaHRtbENyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC8uL3NyYy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0Ly4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG9saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWlyZWRBcmdzKHJlcXVpcmVkLCBhcmdzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA8IHJlcXVpcmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihyZXF1aXJlZCArICcgYXJndW1lbnQnICsgKHJlcXVpcmVkID4gMSA/ICdzJyA6ICcnKSArICcgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmdzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9JbnRlZ2VyKGRpcnR5TnVtYmVyKSB7XG4gIGlmIChkaXJ0eU51bWJlciA9PT0gbnVsbCB8fCBkaXJ0eU51bWJlciA9PT0gdHJ1ZSB8fCBkaXJ0eU51bWJlciA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG5cbiAgdmFyIG51bWJlciA9IE51bWJlcihkaXJ0eU51bWJlcik7XG5cbiAgaWYgKGlzTmFOKG51bWJlcikpIHtcbiAgICByZXR1cm4gbnVtYmVyO1xuICB9XG5cbiAgcmV0dXJuIG51bWJlciA8IDAgPyBNYXRoLmNlaWwobnVtYmVyKSA6IE1hdGguZmxvb3IobnVtYmVyKTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGdldERheXNJbk1vbnRoXG4gKiBAY2F0ZWdvcnkgTW9udGggSGVscGVyc1xuICogQHN1bW1hcnkgR2V0IHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIG1vbnRoIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogR2V0IHRoZSBudW1iZXIgb2YgZGF5cyBpbiBhIG1vbnRoIG9mIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIG51bWJlciBvZiBkYXlzIGluIGEgbW9udGhcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBIb3cgbWFueSBkYXlzIGFyZSBpbiBGZWJydWFyeSAyMDAwP1xuICogY29uc3QgcmVzdWx0ID0gZ2V0RGF5c0luTW9udGgobmV3IERhdGUoMjAwMCwgMSkpXG4gKiAvLz0+IDI5XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0RGF5c0luTW9udGgoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgdmFyIG1vbnRoSW5kZXggPSBkYXRlLmdldE1vbnRoKCk7XG4gIHZhciBsYXN0RGF5T2ZNb250aCA9IG5ldyBEYXRlKDApO1xuICBsYXN0RGF5T2ZNb250aC5zZXRGdWxsWWVhcih5ZWFyLCBtb250aEluZGV4ICsgMSwgMCk7XG4gIGxhc3REYXlPZk1vbnRoLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICByZXR1cm4gbGFzdERheU9mTW9udGguZ2V0RGF0ZSgpO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHNldE1vbnRoIGZyb20gXCIuLi9zZXRNb250aC9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG5cbi8qKlxuICogQG5hbWUgc2V0XG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFNldCBkYXRlIHZhbHVlcyB0byBhIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgZGF0ZSB2YWx1ZXMgdG8gYSBnaXZlbiBkYXRlLlxuICpcbiAqIFNldHMgdGltZSB2YWx1ZXMgdG8gZGF0ZSBmcm9tIG9iamVjdCBgdmFsdWVzYC5cbiAqIEEgdmFsdWUgaXMgbm90IHNldCBpZiBpdCBpcyB1bmRlZmluZWQgb3IgbnVsbCBvciBkb2Vzbid0IGV4aXN0IGluIGB2YWx1ZXNgLlxuICpcbiAqIE5vdGUgYWJvdXQgYnVuZGxlIHNpemU6IGBzZXRgIGRvZXMgbm90IGludGVybmFsbHkgdXNlIGBzZXRYYCBmdW5jdGlvbnMgZnJvbSBkYXRlLWZucyBidXQgaW5zdGVhZCBvcHRzXG4gKiB0byB1c2UgbmF0aXZlIGBEYXRlI3NldFhgIG1ldGhvZHMuIElmIHlvdSB1c2UgdGhpcyBmdW5jdGlvbiwgeW91IG1heSBub3Qgd2FudCB0byBpbmNsdWRlIHRoZVxuICogb3RoZXIgYHNldFhgIGZ1bmN0aW9ucyB0aGF0IGRhdGUtZm5zIHByb3ZpZGVzIGlmIHlvdSBhcmUgY29uY2VybmVkIGFib3V0IHRoZSBidW5kbGUgc2l6ZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcyAtIGFuIG9iamVjdCB3aXRoIG9wdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBbdmFsdWVzLnllYXJdIC0gdGhlIG51bWJlciBvZiB5ZWFycyB0byBiZSBzZXRcbiAqIEBwYXJhbSB7TnVtYmVyfSBbdmFsdWVzLm1vbnRoXSAtIHRoZSBudW1iZXIgb2YgbW9udGhzIHRvIGJlIHNldFxuICogQHBhcmFtIHtOdW1iZXJ9IFt2YWx1ZXMuZGF0ZV0gLSB0aGUgbnVtYmVyIG9mIGRheXMgdG8gYmUgc2V0XG4gKiBAcGFyYW0ge051bWJlcn0gW3ZhbHVlcy5ob3Vyc10gLSB0aGUgbnVtYmVyIG9mIGhvdXJzIHRvIGJlIHNldFxuICogQHBhcmFtIHtOdW1iZXJ9IFt2YWx1ZXMubWludXRlc10gLSB0aGUgbnVtYmVyIG9mIG1pbnV0ZXMgdG8gYmUgc2V0XG4gKiBAcGFyYW0ge051bWJlcn0gW3ZhbHVlcy5zZWNvbmRzXSAtIHRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byBiZSBzZXRcbiAqIEBwYXJhbSB7TnVtYmVyfSBbdmFsdWVzLm1pbGxpc2Vjb25kc10gLSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBiZSBzZXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCBvcHRpb25zIHNldFxuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYHZhbHVlc2AgbXVzdCBiZSBhbiBvYmplY3RcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gVHJhbnNmb3JtIDEgU2VwdGVtYmVyIDIwMTQgaW50byAyMCBPY3RvYmVyIDIwMTUgaW4gYSBzaW5nbGUgbGluZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHNldChuZXcgRGF0ZSgyMDE0LCA4LCAyMCksIHsgeWVhcjogMjAxNSwgbW9udGg6IDksIGRhdGU6IDIwIH0pXG4gKiAvLz0+IFR1ZSBPY3QgMjAgMjAxNSAwMDowMDowMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTZXQgMTIgUE0gdG8gMSBTZXB0ZW1iZXIgMjAxNCAwMToyMzo0NSB0byAxIFNlcHRlbWJlciAyMDE0IDEyOjAwOjAwOlxuICogY29uc3QgcmVzdWx0ID0gc2V0KG5ldyBEYXRlKDIwMTQsIDgsIDEsIDEsIDIzLCA0NSksIHsgaG91cnM6IDEyIH0pXG4gKiAvLz0+IE1vbiBTZXAgMDEgMjAxNCAxMjoyMzo0NVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXQoZGlydHlEYXRlLCB2YWx1ZXMpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZXMgIT09ICdvYmplY3QnIHx8IHZhbHVlcyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd2YWx1ZXMgcGFyYW1ldGVyIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUpOyAvLyBDaGVjayBpZiBkYXRlIGlzIEludmFsaWQgRGF0ZSBiZWNhdXNlIERhdGUucHJvdG90eXBlLnNldEZ1bGxZZWFyIGlnbm9yZXMgdGhlIHZhbHVlIG9mIEludmFsaWQgRGF0ZVxuXG4gIGlmIChpc05hTihkYXRlLmdldFRpbWUoKSkpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxuXG4gIGlmICh2YWx1ZXMueWVhciAhPSBudWxsKSB7XG4gICAgZGF0ZS5zZXRGdWxsWWVhcih2YWx1ZXMueWVhcik7XG4gIH1cblxuICBpZiAodmFsdWVzLm1vbnRoICE9IG51bGwpIHtcbiAgICBkYXRlID0gc2V0TW9udGgoZGF0ZSwgdmFsdWVzLm1vbnRoKTtcbiAgfVxuXG4gIGlmICh2YWx1ZXMuZGF0ZSAhPSBudWxsKSB7XG4gICAgZGF0ZS5zZXREYXRlKHRvSW50ZWdlcih2YWx1ZXMuZGF0ZSkpO1xuICB9XG5cbiAgaWYgKHZhbHVlcy5ob3VycyAhPSBudWxsKSB7XG4gICAgZGF0ZS5zZXRIb3Vycyh0b0ludGVnZXIodmFsdWVzLmhvdXJzKSk7XG4gIH1cblxuICBpZiAodmFsdWVzLm1pbnV0ZXMgIT0gbnVsbCkge1xuICAgIGRhdGUuc2V0TWludXRlcyh0b0ludGVnZXIodmFsdWVzLm1pbnV0ZXMpKTtcbiAgfVxuXG4gIGlmICh2YWx1ZXMuc2Vjb25kcyAhPSBudWxsKSB7XG4gICAgZGF0ZS5zZXRTZWNvbmRzKHRvSW50ZWdlcih2YWx1ZXMuc2Vjb25kcykpO1xuICB9XG5cbiAgaWYgKHZhbHVlcy5taWxsaXNlY29uZHMgIT0gbnVsbCkge1xuICAgIGRhdGUuc2V0TWlsbGlzZWNvbmRzKHRvSW50ZWdlcih2YWx1ZXMubWlsbGlzZWNvbmRzKSk7XG4gIH1cblxuICByZXR1cm4gZGF0ZTtcbn0iLCJpbXBvcnQgdG9JbnRlZ2VyIGZyb20gXCIuLi9fbGliL3RvSW50ZWdlci9pbmRleC5qc1wiO1xuaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgZ2V0RGF5c0luTW9udGggZnJvbSBcIi4uL2dldERheXNJbk1vbnRoL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBzZXRNb250aFxuICogQGNhdGVnb3J5IE1vbnRoIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFNldCB0aGUgbW9udGggdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTZXQgdGhlIG1vbnRoIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gbW9udGggLSB0aGUgbW9udGggb2YgdGhlIG5ldyBkYXRlXG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1vbnRoIHNldFxuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTZXQgRmVicnVhcnkgdG8gMSBTZXB0ZW1iZXIgMjAxNDpcbiAqIGNvbnN0IHJlc3VsdCA9IHNldE1vbnRoKG5ldyBEYXRlKDIwMTQsIDgsIDEpLCAxKVxuICogLy89PiBTYXQgRmViIDAxIDIwMTQgMDA6MDA6MDBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXRNb250aChkaXJ0eURhdGUsIGRpcnR5TW9udGgpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIHZhciBtb250aCA9IHRvSW50ZWdlcihkaXJ0eU1vbnRoKTtcbiAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgdmFyIGRhdGVXaXRoRGVzaXJlZE1vbnRoID0gbmV3IERhdGUoMCk7XG4gIGRhdGVXaXRoRGVzaXJlZE1vbnRoLnNldEZ1bGxZZWFyKHllYXIsIG1vbnRoLCAxNSk7XG4gIGRhdGVXaXRoRGVzaXJlZE1vbnRoLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgZGF5c0luTW9udGggPSBnZXREYXlzSW5Nb250aChkYXRlV2l0aERlc2lyZWRNb250aCk7IC8vIFNldCB0aGUgbGFzdCBkYXkgb2YgdGhlIG5ldyBtb250aFxuICAvLyBpZiB0aGUgb3JpZ2luYWwgZGF0ZSB3YXMgdGhlIGxhc3QgZGF5IG9mIHRoZSBsb25nZXIgbW9udGhcblxuICBkYXRlLnNldE1vbnRoKG1vbnRoLCBNYXRoLm1pbihkYXksIGRheXNJbk1vbnRoKSk7XG4gIHJldHVybiBkYXRlO1xufSIsImltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpOyAvLyBDbG9uZSB0aGUgZGF0ZVxuXG4gIGlmIChhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHwgdHlwZW9mIGFyZ3VtZW50ID09PSAnb2JqZWN0JyAmJiBhcmdTdHIgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudC5nZXRUaW1lKCkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCA9PT0gJ251bWJlcicgfHwgYXJnU3RyID09PSAnW29iamVjdCBOdW1iZXJdJykge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCh0eXBlb2YgYXJndW1lbnQgPT09ICdzdHJpbmcnIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgU3RyaW5nXScpICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcIlN0YXJ0aW5nIHdpdGggdjIuMC4wLWJldGEuMSBkYXRlLWZucyBkb2Vzbid0IGFjY2VwdCBzdHJpbmdzIGFzIGRhdGUgYXJndW1lbnRzLiBQbGVhc2UgdXNlIGBwYXJzZUlTT2AgdG8gcGFyc2Ugc3RyaW5ncy4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjc3RyaW5nLWFyZ3VtZW50c1wiKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcblxuICAgICAgY29uc29sZS53YXJuKG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufSIsImltcG9ydCB7IGh0bWxDcmVhdG9yIH0gZnJvbSBcIi4vaHRtbENyZWF0b3JcIjtcbmltcG9ydCB7IGNvbnRyb2wgfSBmcm9tIFwiLi9sb2dpY1wiO1xuXG5sZXQgZGlzcGxheSA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBwcm9qZWN0QWRkQnV0dG9uO1xuICBsZXQgdGFza0FkZEJ1dHRvbjtcbiAgbGV0IHByb2plY3RDb250YWluZXI7XG4gIGxldCB0YXNrQ29udGFpbmVyO1xuICBsZXQgc2VsZWN0ZWRQcm9qZWN0ID0gMDtcbiAgbGV0IHNlbGVjdGVkVGFzayA9IDA7XG5cbiAgZnVuY3Rpb24gY2FjaGVET00oKSB7XG4gICAgcHJvamVjdEFkZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1hZGRcIik7XG4gICAgdGFza0FkZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1hZGRcIik7XG4gICAgcHJvamVjdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1zZWxlY3RvclwiKTtcbiAgICB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXNlbGVjdG9yXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gYnV0dG9uTGlzdGVuZXIoKSB7XG4gICAgcHJvamVjdEFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY3JlYXRlUHJvamVjdCk7XG4gICAgdGFza0FkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY3JlYXRlVGFzayk7XG4gIH1cblxuICBmdW5jdGlvbiBwb3B1bGF0ZVByb2plY3RzKCkge1xuICAgIHByb2plY3RDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBsZXQgcHJvamVjdExpc3QgPSBjb250cm9sLmdldFByb2plY3RzKCk7XG4gICAgcHJvamVjdExpc3QuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcbiAgICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoXG4gICAgICAgIGh0bWxDcmVhdG9yLnByb2plY3QoaW5kZXgsIGVsZW0ucHJvamVjdC50aXRsZSlcbiAgICAgICk7XG4gICAgfSk7XG4gICAgbGV0IGFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1kYXRhXCIpW3NlbGVjdGVkUHJvamVjdF07XG4gICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYWN0aXZlLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWVudHJ5LWFjdGl2ZVwiKTtcbiAgICBhY3RpdmUuY2hpbGROb2Rlc1sxXS5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1lZGl0LTk2LWFjdGl2ZS5wbmdcIjtcbiAgICBhY3RpdmUuY2hpbGROb2Rlc1syXS5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC10cmFzaC05Ni1hY3RpdmUuc3ZnXCI7XG4gIH1cblxuICBmdW5jdGlvbiBwb3B1bGF0ZVRhc2tzKCkge1xuICAgIHRhc2tDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBpZiAoY29udHJvbC5nZXRQcm9qZWN0cygpLmxlbmd0aCA9PSAwKSB7XG4gICAgICBzZWxlY3RlZFByb2plY3QgPSAwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgdGFza0xpc3QgPSBjb250cm9sLmdldFByb2plY3RzKClbc2VsZWN0ZWRQcm9qZWN0XS5wcm9qZWN0LnRhc2tzO1xuICAgIHRhc2tMaXN0LmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XG4gICAgICBsZXQgZW50cnkgPSBodG1sQ3JlYXRvci50YXNrKGluZGV4LCBlbGVtLnRpdGxlLCBlbGVtLmR1ZURhdGUpO1xuICAgICAgaWYgKGVsZW0uZG9uZSkge1xuICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKFwidGFzay1jb21wbGV0ZWRcIilcbiAgICAgICAgZW50cnkuY2hpbGROb2Rlc1swXS5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1jaGVja21hcmtfY2hlY2tlZC05Ni5wbmdcIjtcbiAgICAgICAgZW50cnkuY2hpbGROb2Rlc1szXS5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1lZGl0LTk2LnBuZ1wiO1xuICAgICAgICBlbnRyeS5jaGlsZE5vZGVzWzRdLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LXRyYXNoLTk2LW5vbmFjdGl2ZS5zdmdcIjtcbiAgICAgIH1cbiAgICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoZW50cnkpO1xuICAgIH0pO1xuICAgIGxldCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRhc2stZGF0YVwiKVtzZWxlY3RlZFRhc2tdO1xuICAgIGlmICghYWN0aXZlKSB7cmV0dXJufVxuICAgIGFjdGl2ZS5jbGFzc0xpc3QuYWRkKFwidGFzay1lbnRyeS1hY3RpdmVcIik7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0KGUpIHtcbiAgICBjb250cm9sLmNyZWF0ZVByb2plY3QoKTtcbiAgICByZWZyZXNoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVUYXNrKGUpIHtcbiAgICBjb250cm9sLmNyZWF0ZVRhc2soc2VsZWN0ZWRQcm9qZWN0KTtcbiAgICByZWZyZXNoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW5Qcm9qZWN0KCkge1xuICAgIGxldCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1kYXRhXCIpO1xuICAgIHByb2plY3RzLmZvckVhY2goKGVsZW0pID0+XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoZS50YXJnZXQuaWQgPT0gXCJkZWxldGVQcm9qZWN0XCIpIHtcbiAgICAgICAgICBkZWxldGVQcm9qZWN0KGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcik7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaWQgPT0gXCJlZGl0UHJvamVjdFwiKSB7XG4gICAgICAgICAgcHJvamVjdEFjdGl2ZShlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXIpO1xuICAgICAgICAgIGxpc3RlblByb2plY3RUaXRsZU1vZChlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9qZWN0QWN0aXZlKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RlblRhc2soKSB7XG4gICAgbGV0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLWRhdGFcIik7XG4gICAgdGFza3MuZm9yRWFjaCgoZWxlbSkgPT5cbiAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5pZCA9PSBcImRlbGV0ZVRhc2tcIikge1xuICAgICAgICAgIGRlbGV0ZVRhc2soZS50YXJnZXQuZGF0YXNldC5jb3VudGVyKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5pZCA9PSBcImVkaXRUYXNrXCIpIHtcbiAgICAgICAgICB0YXNrQWN0aXZlKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlcik7XG4gICAgICAgICAgbGlzdGVuVGFza01vZChlKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5pZCA9PSBcInRhc2stY29tcGxldGVcIikge1xuICAgICAgICAgIHRhc2tBY3RpdmUoZS50YXJnZXQuZGF0YXNldC5jb3VudGVyKTtcbiAgICAgICAgICB0YXNrQ29tcGxldGUoZSk7XG4gICAgICAgICAgcmVmcmVzaCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmlkID09IFwidGFzay1kYXRlXCIpIHsgIFxuICAgICAgICAgIHRhc2tBY3RpdmUoZS50YXJnZXQuZGF0YXNldC5jb3VudGVyKTtcbiAgICAgICAgICBsaXN0ZW5UYXNrTW9kKGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhc2tBY3RpdmUoZS50YXJnZXQuZGF0YXNldC5jb3VudGVyKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFza0FjdGl2ZShjb3VudGVyKSB7XG4gICAgc2VsZWN0ZWRUYXNrID0gY291bnRlcjtcbiAgICByZWZyZXNoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9qZWN0QWN0aXZlKGNvdW50ZXIpIHtcbiAgICBzZWxlY3RlZFByb2plY3QgPSBjb3VudGVyO1xuICAgIHJlZnJlc2goKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVRhc2sodGFza0NvdW50ZXIpIHtcbiAgICBsZXQgbmV3U2l6ZSA9IGNvbnRyb2wuZGVsZXRlVGFzayh0YXNrQ291bnRlciwgc2VsZWN0ZWRQcm9qZWN0KSAtIDE7XG4gICAgY29uc29sZS5sb2cobmV3U2l6ZSk7XG4gICAgaWYgKHNlbGVjdGVkVGFzayA+IG5ld1NpemUpIHtcbiAgICAgIHNlbGVjdGVkVGFzayA9IHNlbGVjdGVkVGFzayAtIDE7XG4gICAgfVxuICAgIHJlZnJlc2goKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGV0ZVByb2plY3QoY291bnRlcikge1xuICAgIGxldCBuZXdTaXplID0gY29udHJvbC5kZWxldGVQcm9qZWN0KGNvdW50ZXIpIC0gMTtcbiAgICBpZiAoc2VsZWN0ZWRQcm9qZWN0ID4gbmV3U2l6ZSkge1xuICAgICAgc2VsZWN0ZWRQcm9qZWN0ID0gc2VsZWN0ZWRQcm9qZWN0IC0gMTtcbiAgICB9XG4gICAgcmVmcmVzaCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuVGFza01vZChlKSB7XG4gICAgbGV0IGluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5jb3VudGVyO1xuICAgIGxldCB0YXNrRW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudGFzay1lbnRyeVtkYXRhLWNvdW50ZXI9XCIke2luZGV4fVwiXWApO1xuICAgIGxldCB0YXNrTmFtZSA9IHRhc2tFbnRyeS5jaGlsZE5vZGVzWzFdLnRleHRDb250ZW50O1xuICAgIGxldCB0YXNrRGF0ZSA9IHRhc2tFbnRyeS5jaGlsZE5vZGVzWzJdLnRleHRDb250ZW50O1xuICAgIGxldCBpbnB1dCA9IGh0bWxDcmVhdG9yLnRhc2tNb2QoaW5kZXgsIHRhc2tOYW1lLCB0YXNrRGF0ZSk7XG4gICAgdGFza0VudHJ5LnJlcGxhY2VXaXRoKGlucHV0KTtcbiAgICBcbiAgICBsZXQgZG9uZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtpZD1cImRvbmVNb2RpZmljYXRpb25UYXNrXCJdW2RhdGEtY291bnRlcj1cIiR7aW5kZXh9XCJdYCk7XG4gICAgZG9uZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGxldCBuZXdOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC10YXNrLW5hbWVcIikudmFsdWU7XG4gICAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stZGF0ZS1pbnB1dFwiKS52YWx1ZTtcbiAgICAgIGNvbnRyb2wubW9kaWZ5VGFzayhpbmRleCwgc2VsZWN0ZWRQcm9qZWN0LCBuZXdOYW1lLCB0YXNrRGF0ZSk7XG4gICAgICByZWZyZXNoKCk7XG4gICAgfSk7XG5cbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgIGxldCBuZXdOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5pbnB1dC10YXNrLW5hbWVcIikudmFsdWU7XG4gICAgICAgIGNvbnRyb2wubW9kaWZ5VGFzayhpbmRleCwgc2VsZWN0ZWRQcm9qZWN0LCBuZXdOYW1lKTtcbiAgICAgICAgcmVmcmVzaCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuUHJvamVjdFRpdGxlTW9kKGUpIHtcbiAgICBsZXQgaW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmNvdW50ZXI7XG4gICAgbGV0IHByb2plY3RFbnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBgLnByb2plY3QtZW50cnlbZGF0YS1jb3VudGVyPVwiJHtpbmRleH1cIl1gXG4gICAgKTtcbiAgICBsZXQgcHJvamVjdE5hbWUgPSBwcm9qZWN0RW50cnkuY2hpbGROb2Rlc1swXS50ZXh0Q29udGVudDtcbiAgICBsZXQgaW5wdXQgPSBodG1sQ3JlYXRvci5wcm9qZWN0TW9kKGluZGV4LCBwcm9qZWN0TmFtZSk7XG4gICAgcHJvamVjdEVudHJ5LnJlcGxhY2VXaXRoKGlucHV0KTtcblxuICAgIGxldCBkb25lQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIGBbaWQ9XCJkb25lTW9kaWZpY2F0aW9uUHJvamVjdFwiXVtkYXRhLWNvdW50ZXI9XCIke2luZGV4fVwiXWBcbiAgICApO1xuICAgIGRvbmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBsZXQgbmV3TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW5wdXQtcHJvamVjdC1uYW1lXCIpLnZhbHVlO1xuICAgICAgY29udHJvbC5tb2RpZnlQcm9qZWN0KGluZGV4LCBuZXdOYW1lKTtcbiAgICAgIHJlZnJlc2goKTtcbiAgICB9KTtcblxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgbGV0IG5ld05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmlucHV0LXByb2plY3QtbmFtZVwiKS52YWx1ZTtcbiAgICAgICAgY29udHJvbC5tb2RpZnlQcm9qZWN0KGluZGV4LCBuZXdOYW1lKTtcbiAgICAgICAgcmVmcmVzaCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFza0NvbXBsZXRlKGUpIHtcbiAgICBjb250cm9sLnRhc2tDb21wbGV0ZShlLCBzZWxlY3RlZFByb2plY3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVmcmVzaCgpIHtcbiAgICBjYWNoZURPTSgpO1xuICAgIGJ1dHRvbkxpc3RlbmVyKCk7XG4gICAgcG9wdWxhdGVQcm9qZWN0cygpO1xuICAgIHBvcHVsYXRlVGFza3MoKTtcbiAgICBsaXN0ZW5Qcm9qZWN0KCk7XG4gICAgbGlzdGVuVGFzaygpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjYWNoZURPTSxcbiAgICBidXR0b25MaXN0ZW5lcixcbiAgICByZWZyZXNoLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgZGlzcGxheSB9O1xuIiwiLy8gUFJPSkVDVCBGQUNUT1JZIEZVTkNUSU9OICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IHByb2plY3RGYWN0b3J5ID0gZnVuY3Rpb24gKHRpdGxlKSB7XG4gIHJldHVybiB7XG4gICAgcHJvamVjdDoge1xuICAgICAgdGl0bGUsXG4gICAgICB0YXNrczogW10sXG4gICAgfSxcbiAgICBhZGRUYXNrOiBmdW5jdGlvbiAobmV3VGFzaykge1xuICAgICAgdGhpcy5wcm9qZWN0LnRhc2tzLnB1c2gobmV3VGFzaylcbiAgICB9LFxuICB9O1xufTtcblxuLy8gVEFTSyBGQUNUT1JZIEZVTkNUSU9OLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IHRhc2tGYWN0b3J5ID0gZnVuY3Rpb24gKHRpdGxlKSB7XG4gIHJldHVybiB7XG4gICAgdGl0bGUsXG4gICAgZHVlRGF0ZTogXCJcIixcbiAgICBkb25lOiBmYWxzZSxcbiAgfTs7XG59O1xuXG5leHBvcnQgeyBwcm9qZWN0RmFjdG9yeSwgdGFza0ZhY3RvcnkgfSIsIi8vIENSRUFURSBUSEUgSFRNTCBGT1IgVEhFIFBST0pFQ1QgRU5UUlkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmxldCBodG1sQ3JlYXRvciA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBwcm9qZWN0ID0gZnVuY3Rpb24gKGluZGV4LCB0aXRsZSkge1xuICAgIGxldCBwcm9qZWN0RW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RFbnRyeS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1lbnRyeVwiLCBcInByb2plY3QtZGF0YVwiKTtcbiAgICBwcm9qZWN0RW50cnkuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcblxuICAgIGxldCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICBwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uYW1lXCIpO1xuICAgIHByb2plY3ROYW1lLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG5cbiAgICBsZXQgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZWRpdFByb2plY3RcIik7XG4gICAgZWRpdEljb24uc3JjID0gXCIuL2Fzc2V0cy9pY29uczgtZWRpdC05Ni5wbmdcIjtcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGVkaXRJY29uLmFsdCA9IFwiRWRpdCBJY29uXCI7XG5cbiAgICBsZXQgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRlbGV0ZVByb2plY3RcIik7XG4gICAgZGVsZXRlSWNvbi5zcmMgPSBcIi9hc3NldHMvaWNvbnM4LXRyYXNoLTk2LW5vbmFjdGl2ZS5zdmdcIjtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZGVsZXRlSWNvbi5hbHQgPSBcImRlbGV0ZSBJY29uXCI7XG5cbiAgICBwcm9qZWN0RW50cnkuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuICAgIHByb2plY3RFbnRyeS5hcHBlbmRDaGlsZChlZGl0SWNvbik7XG4gICAgcHJvamVjdEVudHJ5LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuXG4gICAgcmV0dXJuIHByb2plY3RFbnRyeTtcbiAgfTtcblxuICAvLyBDUkVBVEUgVEhFIEhUTUwgRk9SIFRIRSBQUk9KRUNUIEVOVFJZIE1PRElGSUNBVElPTlxuXG4gIGxldCBwcm9qZWN0TW9kID0gZnVuY3Rpb24gKGluZGV4LCB0aXRsZSkge1xuICAgIGxldCBwcm9qZWN0RW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RFbnRyeS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1lbnRyeVwiLCBcInByb2plY3QtZGF0YVwiLCBcInByb2plY3QtZW50cnktYWN0aXZlXCIpO1xuICAgIHByb2plY3RFbnRyeS5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuXG4gICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoXCJpbnB1dC1wcm9qZWN0LW5hbWVcIilcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICBpbnB1dC52YWx1ZSA9IHRpdGxlO1xuXG4gICAgbGV0IGRvbmVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkb25lSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRvbmVNb2RpZmljYXRpb25Qcm9qZWN0XCIpO1xuICAgIGRvbmVJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWRvbmUtOTYucG5nXCI7XG4gICAgZG9uZUljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBkb25lSWNvbi5hbHQgPSBcIkRvbmUgSWNvblwiO1xuXG4gICAgbGV0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkZWxldGVQcm9qZWN0XCIpO1xuICAgIGRlbGV0ZUljb24uc3JjID0gXCIvYXNzZXRzL2ljb25zOC10cmFzaC05Ni1hY3RpdmUuc3ZnXCI7XG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGRlbGV0ZUljb24uYWx0ID0gXCJkZWxldGUgSWNvblwiO1xuXG4gICAgcHJvamVjdEVudHJ5LmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICBwcm9qZWN0RW50cnkuYXBwZW5kQ2hpbGQoZG9uZUljb24pO1xuICAgIHByb2plY3RFbnRyeS5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcblxuICAgIHJldHVybiBwcm9qZWN0RW50cnk7XG4gIH07XG5cbiAgLy8gQ1JFQVRFIFRIRSBIVE1MIEZPUiBUSEUgVEFTSyBFTlRSWSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBsZXQgdGFzayA9IGZ1bmN0aW9uIChpbmRleCwgdGl0bGUsIGRhdGUpIHtcbiAgICBsZXQgdGFza0VudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRW50cnkuY2xhc3NMaXN0LmFkZChcInRhc2stZW50cnlcIiwgXCJ0YXNrLWRhdGFcIik7XG4gICAgdGFza0VudHJ5LnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG5cbiAgICBsZXQgY2hlY2ttYXJrSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgY2hlY2ttYXJrSWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC1jaGVja21hcmtfdW5jaGVja2VkLTk2LnBuZ1wiO1xuICAgIGNoZWNrbWFya0ljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0YXNrLWNvbXBsZXRlXCIpXG4gICAgY2hlY2ttYXJrSWNvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvdW50ZXJcIiwgaW5kZXgpO1xuICAgIGNoZWNrbWFya0ljb24uYWx0ID0gXCJkZWxldGUgSWNvblwiO1xuXG4gICAgbGV0IHRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrTmFtZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgIHRhc2tOYW1lLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLW5hbWVcIik7XG4gICAgdGFza05hbWUuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcblxuICAgIGxldCB0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tEYXRlLnRleHRDb250ZW50ID0gZGF0ZTtcbiAgICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWRhdGUnKVxuICAgIHRhc2tEYXRlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwidGFzay1kYXRlXCIpO1xuXG4gICAgbGV0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImVkaXRUYXNrXCIpO1xuICAgIGVkaXRJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWVkaXQtOTYtYWN0aXZlLnBuZ1wiO1xuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZWRpdEljb24uYWx0ID0gXCJFZGl0IEljb25cIjtcblxuICAgIGxldCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZGVsZXRlVGFza1wiKTtcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgZGVsZXRlSWNvbi5zcmMgPSBcIi4vYXNzZXRzL2ljb25zOC10cmFzaC05Ni1hY3RpdmUuc3ZnXCI7XG4gICAgZGVsZXRlSWNvbi5hbHQgPSBcImRlbGV0ZSBJY29uXCI7XG5cbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQoY2hlY2ttYXJrSWNvbik7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKHRhc2tOYW1lKTtcbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQodGFza0RhdGUpO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZChlZGl0SWNvbik7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xuXG4gICAgcmV0dXJuIHRhc2tFbnRyeTtcbiAgfTtcblxuICBsZXQgdGFza01vZCA9IGZ1bmN0aW9uIChpbmRleCwgdGl0bGUsIGRhdGUpIHtcbiAgICBsZXQgdGFza0VudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRW50cnkuY2xhc3NMaXN0LmFkZChcInRhc2stZW50cnlcIiwgXCJ0YXNrLWRhdGFcIiwgXCJ0YXNrLWVudHJ5LWFjdGl2ZVwiKTtcbiAgICB0YXNrRW50cnkuc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcblxuICAgIGxldCBjaGVja21hcmtJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBjaGVja21hcmtJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWNoZWNrbWFya191bmNoZWNrZWQtOTYucG5nXCI7XG4gICAgY2hlY2ttYXJrSWNvbi5hbHQgPSBcImRlbGV0ZSBJY29uXCI7XG5cbiAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQuY2xhc3NMaXN0LmFkZChcImlucHV0LXRhc2stbmFtZVwiKVxuICAgIGlucHV0LnNldEF0dHJpYnV0ZShcImRhdGEtY291bnRlclwiLCBpbmRleCk7XG4gICAgaW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgIGlucHV0LnZhbHVlID0gdGl0bGU7XG5cbiAgICBsZXQgdGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdGFza0RhdGUudHlwZSA9IFwiZGF0ZVwiO1xuICAgIHRhc2tEYXRlLnZhbHVlID0gZGF0ZTtcbiAgICB0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKFwidGFzay1kYXRlXCIpO1xuICAgIHRhc2tEYXRlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwidGFzay1kYXRlLWlucHV0XCIpO1xuXG4gICAgbGV0IGRvbmVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBkb25lSWNvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRvbmVNb2RpZmljYXRpb25UYXNrXCIpO1xuICAgIGRvbmVJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LWRvbmUtOTYucG5nXCI7XG4gICAgZG9uZUljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBkb25lSWNvbi5hbHQgPSBcIkRvbmUgSWNvblwiO1xuXG4gICAgbGV0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJkZWxldGVUYXNrXCIpO1xuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKFwiZGF0YS1jb3VudGVyXCIsIGluZGV4KTtcbiAgICBkZWxldGVJY29uLnNyYyA9IFwiLi9hc3NldHMvaWNvbnM4LXRyYXNoLTk2LWFjdGl2ZS5zdmdcIjtcbiAgICBkZWxldGVJY29uLmFsdCA9IFwiZGVsZXRlIEljb25cIjtcblxuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZChjaGVja21hcmtJY29uKTtcbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgIHRhc2tFbnRyeS5hcHBlbmRDaGlsZCh0YXNrRGF0ZSk7XG4gICAgdGFza0VudHJ5LmFwcGVuZENoaWxkKGRvbmVJY29uKTtcbiAgICB0YXNrRW50cnkuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XG5cbiAgICByZXR1cm4gdGFza0VudHJ5O1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgcHJvamVjdCxcbiAgICBwcm9qZWN0TW9kLFxuICAgIHRhc2ssXG4gICAgdGFza01vZCxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCB7IGh0bWxDcmVhdG9yIH07IiwiaW1wb3J0IHsgcHJvamVjdEZhY3RvcnksIHRhc2tGYWN0b3J5IH0gZnJvbSBcIi4vZmFjdG9yaWVzXCI7XG5pbXBvcnQgeyBtZW1vcnkgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbmxldCBjb250cm9sID0gKGZ1bmN0aW9uICgpIHtcbiAgbGV0IGNyZWF0ZVByb2plY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IG5ld1Byb2plY3QgPSBwcm9qZWN0RmFjdG9yeSgpO1xuICAgIGxldCBjb3VudGVyID0gbWVtb3J5LmFkZFByb2plY3QobmV3UHJvamVjdCkgLSAxO1xuICAgIGxldCBwcm9qZWN0TmFtZSA9IGBOZXcgcHJvamVjdGA7XG4gICAgbW9kaWZ5UHJvamVjdChjb3VudGVyLCBwcm9qZWN0TmFtZSk7XG4gICAgcmV0dXJuIGNvdW50ZXI7IC8vcmV0dXJucyBuZXcgcHJvamVjdCBpbmRleFxuICB9O1xuXG4gIGxldCBjcmVhdGVUYXNrID0gZnVuY3Rpb24gKGluZGV4UHJvamVjdCkge1xuICAgIGxldCBuZXdUYXNrID0gdGFza0ZhY3RvcnkoKTtcbiAgICBsZXQgY291bnRlciA9IG1lbW9yeS5hZGRUYXNrKGluZGV4UHJvamVjdCwgbmV3VGFzaykgLSAxO1xuICAgIGxldCB0YXNrTmFtZSA9IGBOZXcgdGFza2A7XG4gICAgbW9kaWZ5VGFzayhjb3VudGVyLCBpbmRleFByb2plY3QsIHRhc2tOYW1lKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcblxuICBsZXQgZGVsZXRlVGFzayA9IGZ1bmN0aW9uIChpbmRleFRhc2ssIGluZGV4UHJvamVjdCkge1xuICAgIHJldHVybiBtZW1vcnkuZGVsZXRlVGFzayhpbmRleFRhc2ssIGluZGV4UHJvamVjdCk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbW9kaWZ5UHJvamVjdChpbmRleFByb2plY3QsIHRpdGxlKSB7XG4gICAgbWVtb3J5LmVkaXRQcm9qZWN0KGluZGV4UHJvamVjdCwgdGl0bGUpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1vZGlmeVRhc2soY291bnRlciwgaW5kZXhQcm9qZWN0LCB0YXNrTmFtZSwgdGFza0RhdGUpIHtcbiAgICBtZW1vcnkuZWRpdFRhc2soY291bnRlciwgaW5kZXhQcm9qZWN0LCB0YXNrTmFtZSwgdGFza0RhdGUpO1xuICB9O1xuXG4gIGxldCBnZXRQcm9qZWN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbWVtb3J5LmdldFByb2plY3QoKTtcbiAgfTtcblxuICBmdW5jdGlvbiBkZWxldGVQcm9qZWN0KGluZGV4UHJvamVjdCkge1xuICAgIHJldHVybiBtZW1vcnkuZGVsZXRlUHJvamVjdChpbmRleFByb2plY3QpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHRhc2tDb21wbGV0ZShlLCBzZWxlY3RlZFByb2plY3QpIHtcbiAgICBtZW1vcnkuY29tcGxldGVUYXNrVG9nZ2xlKGUudGFyZ2V0LmRhdGFzZXQuY291bnRlciwgc2VsZWN0ZWRQcm9qZWN0KTtcbiAgfTtcblxuICBjcmVhdGVQcm9qZWN0KCk7XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVQcm9qZWN0LFxuICAgIGNyZWF0ZVRhc2ssXG4gICAgZGVsZXRlVGFzayxcbiAgICBtb2RpZnlQcm9qZWN0LFxuICAgIGdldFByb2plY3RzLFxuICAgIGRlbGV0ZVByb2plY3QsXG4gICAgbW9kaWZ5VGFzayxcbiAgICB0YXNrQ29tcGxldGUsXG4gIH07XG59KSgpO1xuXG5leHBvcnQgeyBjb250cm9sIH07XG4iLCJpbXBvcnQgeyBzZXQgfSBmcm9tIFwiZGF0ZS1mbnNcIjtcblxuLy8gTUVNT1JZIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IG1lbW9yeSA9IChmdW5jdGlvbiAoKSB7XG4gIGxldCBwcm9qZWN0cyA9IFtdO1xuXG4gIGxldCBhZGRQcm9qZWN0ID0gZnVuY3Rpb24gKHByb2plY3QpIHtcbiAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIHNhdmVUb1N0b3JhZ2UoKTtcbiAgICByZXR1cm4gZ2V0UHJvamVjdENvdW50ZXIoKTtcbiAgfTtcblxuICBsZXQgYWRkVGFzayA9IGZ1bmN0aW9uIChpbmRleFByb2plY3QsIHRhc2spIHtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLmFkZFRhc2sodGFzayk7XG4gICAgc2F2ZVRvU3RvcmFnZSgpO1xuICAgIHJldHVybiBnZXRUYXNrQ291bnRlcihpbmRleFByb2plY3QpO1xuICB9O1xuXG4gIGxldCBnZXRQcm9qZWN0Q291bnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJvamVjdHMubGVuZ3RoO1xuICB9O1xuXG4gIGxldCBnZXRUYXNrQ291bnRlciA9IGZ1bmN0aW9uIChpbmRleFByb2plY3QpIHtcbiAgICByZXR1cm4gcHJvamVjdHNbaW5kZXhQcm9qZWN0XS5wcm9qZWN0LnRhc2tzLmxlbmd0aDtcbiAgfTtcblxuICBsZXQgZ2V0UHJvamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gWy4uLnByb2plY3RzXTtcbiAgfTtcblxuICBsZXQgZGVsZXRlVGFzayA9IGZ1bmN0aW9uIChpbmRleFRhc2ssIGluZGV4UHJvamVjdCkge1xuICAgIHByb2plY3RzW2luZGV4UHJvamVjdF0ucHJvamVjdC50YXNrcy5zcGxpY2UoaW5kZXhUYXNrLCAxKTtcbiAgICBzYXZlVG9TdG9yYWdlKCk7XG4gICAgcmV0dXJuIHByb2plY3RzW2luZGV4UHJvamVjdF0ucHJvamVjdC50YXNrcy5sZW5ndGg7XG4gIH07XG5cbiAgbGV0IGVkaXRQcm9qZWN0ID0gZnVuY3Rpb24gKGluZGV4UHJvamVjdCwgdGl0bGUpIHtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGl0bGUgPSB0aXRsZTtcbiAgICBzYXZlVG9TdG9yYWdlKCk7XG4gIH07XG5cbiAgbGV0IGVkaXRUYXNrID0gZnVuY3Rpb24gKGluZGV4VGFzaywgaW5kZXhQcm9qZWN0LCB0aXRsZSwgdGFza0RhdGUpIHtcbiAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3NbaW5kZXhUYXNrXS50aXRsZSA9IHRpdGxlO1xuICAgIHByb2plY3RzW2luZGV4UHJvamVjdF0ucHJvamVjdC50YXNrc1tpbmRleFRhc2tdLmR1ZURhdGUgPSB0YXNrRGF0ZTtcbiAgICBzYXZlVG9TdG9yYWdlKCk7XG4gIH07XG5cbiAgbGV0IGNvbXBsZXRlVGFza1RvZ2dsZSA9IGZ1bmN0aW9uIChpbmRleFRhc2ssIGluZGV4UHJvamVjdCkge1xuICAgIGlmIChwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3NbaW5kZXhUYXNrXS5kb25lKSB7XG4gICAgICBwcm9qZWN0c1tpbmRleFByb2plY3RdLnByb2plY3QudGFza3NbaW5kZXhUYXNrXS5kb25lID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2plY3RzW2luZGV4UHJvamVjdF0ucHJvamVjdC50YXNrc1tpbmRleFRhc2tdLmRvbmUgPSB0cnVlO1xuICAgIH1cbiAgICBzYXZlVG9TdG9yYWdlKCk7XG4gIH07XG5cbiAgbGV0IGRlbGV0ZVByb2plY3QgPSBmdW5jdGlvbiAoaW5kZXhQcm9qZWN0KSB7XG4gICAgcHJvamVjdHMuc3BsaWNlKGluZGV4UHJvamVjdCwgMSk7XG4gICAgc2F2ZVRvU3RvcmFnZSgpO1xuICAgIHJldHVybiBwcm9qZWN0cy5sZW5ndGg7XG4gIH07XG5cbiAgZnVuY3Rpb24gY2xlYXIoKXtcbiAgICBwcm9qZWN0cyA9IFtdO1xuICB9XG5cbiAgZnVuY3Rpb24gc2F2ZVRvU3RvcmFnZSgpe1xuICAgIHNldChnZXRQcm9qZWN0KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmV0cmlldmVGcm9tU3RvcmFnZSgpe1xuICAgIGNvbnNvbGUubG9nKGRhdGFiYXNlLnJlYWQoKSlcblxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRQcm9qZWN0LFxuICAgIGFkZFRhc2ssXG4gICAgZ2V0UHJvamVjdENvdW50ZXIsXG4gICAgZ2V0VGFza0NvdW50ZXIsXG4gICAgZ2V0UHJvamVjdCxcbiAgICBlZGl0UHJvamVjdCxcbiAgICBlZGl0VGFzayxcbiAgICBkZWxldGVUYXNrLFxuICAgIGRlbGV0ZVByb2plY3QsXG4gICAgY29tcGxldGVUYXNrVG9nZ2xlLFxuICB9O1xufSkoKTtcblxuLy8gREFUQUJBU0UgTU9EVUxFIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxubGV0IGRhdGFiYXNlID0gKGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBzZXQob2JqKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJtYWluXCIsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJtYWluXCIpKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNldCxcbiAgICByZWFkLFxuICB9O1xufSkoKTtcblxuZXhwb3J0IHsgbWVtb3J5IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbXBhcmVBc2MsIGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IGNvbnRyb2wgfSBmcm9tIFwiLi9sb2dpY1wiXG5pbXBvcnQgeyBtZW1vcnkgfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5pbXBvcnQgeyBkaXNwbGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiXG5cblxud2luZG93LmNvbnRyb2wgPSBjb250cm9sO1xud2luZG93Lm1lbW9yeSA9IG1lbW9yeTtcblxuZGlzcGxheS5yZWZyZXNoKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=