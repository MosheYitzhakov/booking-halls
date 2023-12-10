const express = require('express');
// const { getComments, newComment, deleteComm } =require('../../databases/dbComments')
const router = express.Router();
module.exports = router;

router.get('/halls/:name', async (req, res) => {
    try {
        // let postId = req.params.id_post;
        // const user = await getComments(postId)
        res.send(req.params.name)
        // if (!user.length) {
        //     res.status(401).json('No found posts')
        // } else {
        //     res.send(user)
        // }
    } catch (error) {
        res.send(error.message)
    }
})
    .get('/date/:date', async (req, res) => {
        try {
            // let postId = req.params.id_post;
            // const user = await getComments(postId)
            res.send(req.params.date)
            // if (!user.length) {
            //     res.status(401).json('No found posts')
            // } else {
            //     res.send(user)
            // }
        } catch (error) {
            res.send(error.message)
        }
    })
    .post('/allData/', async (req, res) => {
        try {
            // let postId = req.params.id_post;
            // let name=req.body.name;
            // let email=req.body.email;
            // let body=req.body.body;
            // if(!body){
            //     throw new Error("Body is required")
            // }
            // const user = await newComment(postId,name,email,body)
            let body=req.body;
            res.send(body)
            // if (typeof user === 'string') {
            //     res.json('cannot posts')
            // } else {
            //     res.send(user)
            // }
        } catch (error) {
            res.send(error.message)
        }
    })