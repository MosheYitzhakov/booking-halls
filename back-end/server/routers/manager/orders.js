const express = require('express');
const {getOrders,putOrders } =require('../../../database/dbOrders')
const router = express.Router();
module.exports = router;

router.get('/:idHall', async (req, res) => {
    try {
        let idHall = req.params.idHall;
        const user = await getOrders(idHall)
        if (!user.length) {
            res.status(401).json('No found orders')
        } else {
            res.send(user)
        }
    } catch (error) {
        res.send(error.message)
    }
})
.get('/futureOrders/:idHall/', async (req, res) => {
    try {
        let idHall = req.params.idHall;
        const user = await getOrders(idHall,new Date().toISOString().split('T')[0])
        if (!user.length) {
            res.status(401).json('No found orders')
        } else {
            res.send(user)
        }
    } catch (error) {
        res.send(error.message)
    }

})

// .post('/',async (req,res)=>{
//     try {
//         res.send('post order')
//         // let postId = req.params.id_post;
//         // let name=req.body.name;
//         // let email=req.body.email;
//         // let body=req.body.body;
//         // if(!body){
//         //     throw new Error("Body is required")
//         // }
//         // const user = await newComment(postId,name,email,body)
//         // if (typeof user=== 'string') {
//         //     res.json('cannot posts')
//         // } else {
//         //     res.send(user)
//         // }
//     } catch (error) {
//         res.send(error.message)
//     } 
// })
.put('/:id_order/',async (req,res)=>{
    try {
         let id_order = req.params.id_order;
         const data = req.body
         const order = await putOrders(id_order, data)

        res.send(order)
        // let id_comment = req.params.id_comment;
        // if (!user) {
        //     res.status(401).json('No found posts')
        //     } else {
        //         res.send(user)
        //         }
    } catch (error) {
        res.send(error.message) 
    }

})
.delete('/:id_post/:id_comment',async (req,res)=>{
    try {
        res.send("deleted id order")
        // let postId = req.params.id_post;
        // let id_comment = req.params.id_comment;
        // const user = await deleteComm(postId, id_comment)
        // if (!user) {
        //     res.status(401).json('No found posts')
        //     } else {
        //         res.send(user)
        //         }
    } catch (error) {
        
    }
})