require("dotenv").config();

const bcrypt = require("bcrypt");
const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/createUser", auth, async (req, res) => {
  try {
    let { name, uname, pwd } = req.body;
    let isUserCreated = false;
    const salt = await bcrypt.genSalt();
    const hashPwd = await bcrypt.hash(pwd, salt);
    if (req.user.userType === 1) {
      isUserCreated = await userModel.createUser(
        name,
        2,
        uname,
        hashPwd,
        req.user.userId
      );
    }
    if (req.user.userType === 0) {
      isUserCreated = await userModel.createAdmin(name, 1, uname, hashPwd);
    }
    if (isUserCreated) res.json({ msg: "User created successfully" });
    else res.status(500).json({ msg: "Server error" });
  } catch (e) {
    res.status(500).send({ msg: "no proper credential" });
  }
});

router.post("/deleteUser", auth, async (req, res) => {
  try {
    let isDeleted = await userModel.deleteUser(req.body.empId);
    if (isDeleted) {
      let data = await userModel.fetchUsers(req.user.userId);
      res.json(data);
    } else res.status(500).json({ msg: "Problem occured during deletion" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;
