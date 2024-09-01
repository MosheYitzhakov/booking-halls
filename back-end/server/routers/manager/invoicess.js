const express = require("express");

const { postInvoices, getInvoices } = require("../../../database/dbInvoices");
const { getSumOrdersMonth } = require("../../../database/dbSumData");
const { authenticationToken } = require("../../authenticationToken");
const { formatJewishDateInHebrew, toJewishDate } = require("jewish-date");
const router = express.Router();
module.exports = router;
router
  .get("/:nameM", async (req, res) => {
    try {
      let nameM = req.params.nameM;
      if (nameM !== req.user.name) {
        res.send("No found Correct authentication ");
      } else {
        const user = await getInvoices(nameM);
        if (!user.length) {
          res.json("No found invoices");
        } else {
          res.send(user);
        }
      }
    } catch (error) {
      res.send(error.message);
    }
  })
  .get("/sum/:name", async (req, res) => {
    try {
      let name = req.params.name;
      if (name !== req.user.name) {
        res.send("No found Correct authentication ");
      } else {
        const user = await getSumOrdersMonth(name);
        if (!user.length) {
          res.json("No found invoices");
        } else {
          res.send(user);
        }
      }
    } catch (error) {
      res.send(error.message);
    }
  })
  .post("/", async (req, res) => {
    try {
      const id_user = req.body.id_user;
      const payment = req.body.payment;
      const pI = await postInvoices(
        id_user,
        payment,
        new Date().toLocaleString("he-IL"),
        formatJewishDateInHebrew(toJewishDate(new Date()))
      );
      if (typeof pI === "number") {
        res.send(`posted invoices number ${pI}`);
      } else {
        res.send(pI);
      }
    } catch (error) {
      res.send(error.message);
    }
  });
