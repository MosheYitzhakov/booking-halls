const express = require('express');
// const { getComments, newComment, deleteComm } =require('../../databases/dbComments')
const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
    try {
        res.send('login')
        // let postId = req.params.id_post;
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