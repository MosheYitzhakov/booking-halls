const express = require('express');
const { getHalls,putSetting } =require('../../../database/dbHalls')
const router = express.Router();
module.exports = router;

router.get("/:nameHall", async (req, res) => {
    try {
        let name = req.params.nameHall;
       setting = await getHalls(name)
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