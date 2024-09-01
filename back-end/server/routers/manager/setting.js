const express = require("express");
const {
  putSetting,
  getSettings,
} = require("../../../database/dbHalls");
const { authenticationToken } = require("../../authenticationToken");
const router = express.Router();
module.exports = router;
router
  .get("/:nameM", async (req, res) => {
    try {
      let name = req.params.nameM;
      if (name !== req.user.name) {
        res.send("No found Correct authentication ");
      } else {
        const setting = await getSettings(name);
        if (!setting.length) {
          throw new Error(`Hall ${hall_name} not found`);
        } else {
          res.send(setting);
        }
      }
    } catch (error) {
      res.send(error.message);
    }
  })

  .put("/:idHall", async (req, res) => {
    try {
      let idHall = req.params.idHall;
      const data = req.body;
      const put = await putSetting(idHall, data);
      res.send(put);
    } catch (error) {
      res.send(error.message);
    }
  });
