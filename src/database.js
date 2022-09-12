import { projects } from "./projects";

let database = function(){

  let write = function(obj) {
    localStorage.setItem("tasks", JSON.stringify(obj))
  }

  let read = function(key) {
    if (key == "tasks") {
      console.log(localStorage.getItem("tasks"));
    } else if (key == "projects") {
      console.log
    }
  }

  return {
    write,
    read,
  }
}()

export { database }

// localStorage.setItem("tasks",)