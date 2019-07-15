let currId = 0;
let todoListEntries = {};

let makeToDo = function(title, task) {
  if (!title) throw "Must provide a title";
  if (!task) throw "Must provide a task";

  let newTask = {
    id: ++currId,
    title: title,
    task: task,
    done: false,
    notDone: true
  };

  todoListEntries[newTask.id] = newTask;
  return newTask;
};

let getToDo = function(id) {
  if (!todoListEntries[id]) throw "No such entry exists";
  return todoListEntries[id];
};

let finishToDo = function(id) {
  let entry = getToDo(id);
  entry.done = true;
  entry.notDone = false;

  return entry;
};

let updateToDo = function(id, newTitle, newTask) {
  let entry = getToDo(id);
  if (newTitle) entry.title = newTitle;
  if (newTask) entry.task = newTask;

  return entry;
};

let getAll = function() {
  return Object.keys(todoListEntries).map(function(key) {
    return todoListEntries[key];
  });
};

let getFinished = function() {
  return getAll().filter(function(entry) {
    return entry.done;
  });
};

let getUnfinished = function() {
  return getAll().filter(function(entry) {
    return !entry.done;
  });
};

module.exports = {
  getToDo: getToDo,
  finishToDo: finishToDo,
  updateToDo: updateToDo,
  getAll: getAll,
  getFinished: getFinished,
  getUnfinished: getUnfinished,
  makeToDo: makeToDo
};

module.exports.makeToDo("Finish ToDo List", "You should finish this list");
