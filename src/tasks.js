let tasks = function() {
  
  let create = function(taskTitle, description, dueDate, priority, notes, checklist) {
    return ({
      taskTitle,
      description,
      dueDate,
      priority,
      notes,
      checklist,
    })
  }

  return{
    create,
  }
}()

export { tasks }