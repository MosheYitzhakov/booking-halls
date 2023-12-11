const express = require('express');
const { getNameHalls } =require('../../database/dbHalls')
const router = express.Router();
module.exports = router;

router.get('/halls/:name', async (req, res) => {
    try {
        const halls_name = req.params.name;
        let halls;
        if(halls_name === 'allHalls'){
            halls = await getNameHalls()
        }else{
            halls = await getNameHalls(halls_name)
        }
        if (!halls.length) {
            res.status(401).json('No found hall')
        } else {
            res.send(halls)
        }
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