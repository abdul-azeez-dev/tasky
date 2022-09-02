const express = require("express");
const models = require("../models/model");
const userModel = require("../models/userModel");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Home page");
});

// to view task
router.get("/tasks", auth, async (req, res) => {
  if (req.user && req.user.userId) {
    let data = await models.fetchTasks(req.user.userId);
    res.send(data);
  } else {
    res.status(401).json({ msg: "unauthorized user" });
  }
});
// to add task
router.post("/add", auth, async (req, res) => {
  if (req.user && req.user.userId) {
    let data = await models.addTask(req.user.userId, req.body.task);
    res.send(data);
  } else {
    res.status(401).json({ msg: "unauthorized user" });
  }
});
// to remove task
router.post("/remove", auth, async (req, res) => {
  if (req.user && req.user.userId) {
    let data = await models.removeTask(req.user.userId, req.body.task);
    res.send(data);
  } else {
    res.status(401).json({ msg: "unauthorized user" });
  }
});
// to modify task
router.post("/modify", auth, async (req, res) => {
  if (req.user && req.user.userId) {
    let data = await models.modifyTask(req.user.userId, req.body.task);
    res.send(data);
  } else {
    res.status(401).json({ msg: "unauthorized user" });
  }
});

// to fetch users mapped to admin
router.post("/fetchUser", auth, async (req, res) => {
  try {
    let data = await userModel.fetchUsers(req.user.userId);
    res.json(data);
  } catch (e) {
    res.status(500).json({ msg: "server error" });
  }
});
router.post("/fetchUserTask", auth, async (req, res) => {
  try {
    let userList = await userModel.fetchUserList(req.user.userId);
    let accessUser = parseInt(req.body.uid);
    let userMatched = await userList.find(
      (user) => user.user_id === accessUser
    );
    if (userMatched) {
      let data = await models.fetchTasks(accessUser);
      res.json(data);
    } else {
      res.json({ msg: "no user matched" });
    }
  } catch {
    res.status(500).json({ msg: "server error" });
  }
});
module.exports = router;
