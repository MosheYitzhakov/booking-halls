const express = require("express");
const {
  getOrders,
  putOrders,
  deleteOrders,
} = require("../../../database/dbOrders");
const { authenticationToken } = require("../../../server/authenticationToken");
const router = express.Router();
module.exports = router;
router
  .get("/:nameM", async (req, res) => {
    try {
      let nameM = req.params.nameM;
      if (nameM !== req.user.name) {
        return res.send("No found Correct authentication");
      } else {
        const user = await getOrders(nameM);
        if (!user.length) {
          res.send("No found orders");
        } else {
          res.send(user);
        }
      }
    } catch (error) {
      res.send(error.message);
    }
  })
  .get("/futureOrders/:nameM/", async (req, res) => {
    try {
      let nameM = req.params.nameM;
      if (nameM !== req.user.name) {
        return res.send("No found Correct authentication ");
      } else {
        let future = new Date().toISOString().slice(0, 19).replace("T", " ");
        const user = await getOrders(nameM, future);
        if (!user.length) {
          res.send("No found orders");
        } else {
          res.send(user);
        }
      }
    } catch (error) {
      res.send(error.message);
    }
  })

  .put("/:id_order/", async (req, res) => {
    try {
      let id_order = req.params.id_order;
      const data = req.body;
      // if(nameM !== req.user.name) { res.json('No found Correct authentication ')}
      const order = await putOrders(id_order, data);
      res.send(order);
    } catch (error) {
      res.send(error.message);
    }
  });
