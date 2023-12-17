const express = require('express');
const { putSetting } =require('../../../database/dbHalls')
const router = express.Router();
module.exports = router;

router.get("/:name", async (req, res) => {
    try {
        let name = req.params.name;
        res.send("name")
        // const user = await getComments(postId)
        // if (!user.length) {
        //     res.status(401).json('No found posts')
        // } else {
        //     res.send(user)
        // }
    } catch (error) {
        res.send(error.message)
    }
})
.put("/:idHall", async (req, res) => {
    try {
        let postId = req.params;
        const sett =await putSetting({as:12,dd:"sdds",aa:"ddf",zz:234})
        res.send(sett)
        // const user = await getComments(postId)
        // if (!user.length) {
        //     res.status(401).json('No found posts')
        // } else {
        //     res.send(user)
        // }
    } catch (error) {
        res.send(error.message)
    }
})