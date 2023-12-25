const express = require('express');
const { getOrders, putOrders, deleteOrders } = require('../../../database/dbOrders')
const { getCO } = require('../../../database/dbCustomers_Orders')
const router = express.Router();
module.exports = router;

router.get('/:nameM', async (req, res) => {
    try {
        let nameM = req.params.nameM;
        const user = await getOrders(nameM)
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
            const user = await getOrders(idHall, new Date().toISOString().split('T')[0])
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
    .put('/:id_order/', async (req, res) => {
        try {
            let id_order = req.params.id_order;
            const data = req.body
            const order = await putOrders(id_order, data)
            res.send(order)
        } catch (error) {
            res.send(error.message)
        }

    })
    // .delete('/:id_order', async (req, res) => {
    //     try {
    //         let id_orders = req.params.id_order;
    //         const c_o = await getCO(id_orders)
    //         const [{id_c ,id_k, id_order }] = c_o
    //         console.log(c_o);
    //         console.log(id_k);
    //         // const order = await deleteOrders(id_order)
    //         res.send(id_orders)
    //     } catch (error) {

    //     }
    // })