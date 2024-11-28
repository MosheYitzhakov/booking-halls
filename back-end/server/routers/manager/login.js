const express = require("express");
const { getManager } = require("../../../database/dbUsers");
const jwt = require("jsonwebtoken");
const router = express.Router();
module.exports = router;

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       404:
 *         description: No found user
 * 
 *     tags: [Manager]
 * 
 */
router.post("/", async (req, res) => {
  try {
    const name = req.body?.name;
    const password = req.body?.password;
    if (!name || !password) return;
    // console.log(password, name);
    const dataManager = await getManager(name, password);
    // console.log(dataManager);
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
