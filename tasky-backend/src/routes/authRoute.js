require("dotenv").config();

const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../utils/db");
const router = express.Router();

router.post("/login", async (req, res) => {
  let userData = await db.execute("SELECT * FROM users where username=?;", [
    req.body.uname,
  ]);
  if (!userData[0][0]) res.json({ msg: "login failed" });
  try {
    let { name, password, emp_id, role } = userData[0][0];
    if (await bcrypt.compare(req.body.pwd, password)) {
      const data = { userId: emp_id, userType: role };
      const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN);
      res.status(200).json({ name, user: role, token: accessToken });
    } else {
      res.status(401).json({ msg: "login failed" });
    }
  } catch {
    res.status(500);
  }
});
module.exports = router;
