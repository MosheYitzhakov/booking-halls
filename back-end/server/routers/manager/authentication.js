const express = require("express");
const router = express.Router();
module.exports = router;
const { authenticationToken } = require("../../authenticationToken");
const loginRouter = require("./login");
const ordersRouter = require("./orders");
const settingRouter = require("./setting");
const invoicesRouter = require("./invoicess");
router
  .use("/login", loginRouter)
  .use(authenticationToken)
  .use("/orders", ordersRouter)
  .use("/settings", settingRouter)
  .use("/invoices", invoicesRouter)
  .use("/*", (req, res) => res.send("not found"));
