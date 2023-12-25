const express = require('express');
const { getHalls,putSetting,getSettings } =require('../../../database/dbHalls')
const router = express.Router();
module.exports = router;

router.get("/:nameM", async (req, res) => {
    try {
        let name = req.params.nameM;
       setting = await getSettings(name)
        if (!setting.length) {
            throw new Error(`Hall ${hall_name} not found`)
        } else {
            res.send(setting)
        }
    } catch (error) {
        res.send(error.message)
    }
})

.put("/:idHall", async (req, res) => {
    try {
        let idHall = req.params.idHall;
        const data = req.body
        const put = await putSetting(idHall, data)
        res.send(put)
    } catch (error) {
        res.send(error.message)
    }
})