const db = require("../utils/db");

const createUser = async (name, role, username, password, userId) => {
  let executeQuery = await db.execute(
    "INSERT INTO users(name,role,username,password) VALUES(?,?,?,?)",
    [name, role, username, password]
  );
  if (executeQuery[0].affectedRows > 0) {
    let mapUserQuery = await db.execute(
      "INSERT INTO user_mapping(emp_id,user_id) VALUES(?,?)",
      [userId, executeQuery[0].insertId]
    );
    // console.log(executeQuery[0].insertId);
    return mapUserQuery[0].affectedRows > 0 ? true : false;
  }
};

const createAdmin = async (...params) => {
  let executeQuery = await db.execute(
    "INSERT INTO users(name,role,username,password) VALUES(?,?,?,?)",
    params
  );
  return executeQuery[0].affectedRows > 0 ? true : false;
};

const fetchUsers = async (empId) => {
  let executeQuery = await db.execute(
    "SELECT name,user_id FROM user_mapping inner JOIN users ON user_mapping.user_id = users.emp_id and user_mapping.emp_id=?;",
    [empId]
  );
  return executeQuery[0];
};
const fetchUserList = async (empId) => {
  let executeQuery = await db.execute(
    "SELECT user_id FROM user_mapping WHERE emp_id=?;",
    [empId]
  );
  return executeQuery[0];
};

const deleteUser = async (empId) => {
  let executeQuery = await db.execute("DELETE FROM users WHERE emp_id=?", [
    empId,
  ]);
  return executeQuery[0].affectedRows > 0;
};
module.exports = {
  createUser,
  createAdmin,
  fetchUsers,
  fetchUserList,
  deleteUser,
};
