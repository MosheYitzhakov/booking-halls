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
    console.log(password, name);
    const dataManager = await getManager(name, password);
    console.log(dataManager);
    if (!dataManager.length) {
      res.send("No found user");
    } else {
      const user = { name: name };
      const token = jwt.sign(user, process.env.Secret, { expiresIn: "12h" });
      res.send({ user, token });
    }
  } catch (error) {
    res.send(error.message);
  }
});
