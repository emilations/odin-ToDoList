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

export { task, project, database }