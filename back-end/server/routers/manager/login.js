const express = require("express");
const { getManager } = require("../../../database/dbUsers");
const jwt = require("jsonwebtoken");
const router = express.Router();
module.exports = router;

router.post("/", async (req, res) => {
  try {
    const name = req.body?.name;
    const password = req.body?.password;
    if (!name || !password) throw new Error("Missing data");
    const dataManager = await getManager(name, password);
    if (!dataManager.length) {
      res.send("No found user");
    } else {
      const user = { name };
      const token = jwt.sign(user, process.env.Secret, { expiresIn: "12h" });
      res.send({ user, token });
    }
  } catch (error) {
    res.send(error.message);
  }
});
