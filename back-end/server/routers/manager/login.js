const express = require('express');
// const { getComments, newComment, deleteComm } =require('../../databases/dbComments')
const jwt = require("jsonwebtoken")
const router = express.Router();
module.exports = router;


router.post('/', async (req, res) => {
    try {
        const name = req.body.name
        const password = req.body.password
       const user = {name:name}
const token = jwt.sign(user,process.env.TOKEN,{expiresIn:'30m'})
        res.send(token)
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