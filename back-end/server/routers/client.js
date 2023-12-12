const express = require('express');
const { getHalls } =require('../../database/dbHalls')
const router = express.Router();
module.exports = router;

router.get('/halls/:name', async (req, res) => {
    try {
        const halls_name = req.params.name;
        let halls;
        if(halls_name === 'allHalls'){
            halls = await getHalls()
        }else{
            halls = await getHalls(halls_name)
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
    .post('/craetOrder/', async (req, res) => {
        try {
            // let postId = req.params.id_post;
            // let name=req.body.name;
            // let email=req.body.email;
            // let body=req.body.body;
            // if(!body){
            //     throw new Error("Body is required")
            // }
            let body=req.body;

            // postClient (name, phone, email, side)
            // postClient (name, phone, email, side)
            // postOrders (id_hall, num_guests, num_m_adults, num_m_children, num_m_bar, type, total_payment)
            // postCO (id_c, id_k,id_order)
            // postEvents (id_hall, hebrew_date,date)
            
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