let projects = function() {
  let projectArray = [];

  let create = function(projectTitle) {
    projectArray.push({
    projectTitle,
    })
  }

  let read = function() {
    return [...projectArray]
  }

  return {
    create,
    read,
  }
}()

export { projects }