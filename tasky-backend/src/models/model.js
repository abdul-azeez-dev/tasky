const db = require("../utils/db");

const fetchAll = async (userId) => {
  let executeQuery = await db.execute("SELECT * FROM tasks where emp_id=?;", [
    userId,
  ]);
  return { tasks: executeQuery[0] };
};
const addTask = async (userId, taskName) => {
  let insertQuery = await db.execute(
    "INSERT INTO tasks(task_name,emp_id) VALUES (?,?);",
    [taskName, userId]
  );
  if (insertQuery[0].affectedRows > 0) {
    return fetchAll(userId);
  }
};
const removeTask = async (userId, taskId) => {
  let removeQuery = await db.execute(
    `DELETE FROM tasks WHERE task_id=${taskId};`
  );
  if (removeQuery[0].affectedRows > 0) {
    return fetchAll(userId);
  }
};
const modifyTask = async (userId, task) => {
  let modifyQuery = await db.execute(
    `UPDATE tasks SET task_name="${task.name}", status=${task.status} WHERE task_id=${task.id};`
  );
  if (modifyQuery[0].affectedRows > 0) {
    return fetchAll(userId);
  }
};
module.exports = {
  fetchTasks: fetchAll,
  addTask: addTask,
  removeTask: removeTask,
  modifyTask: modifyTask,
};
