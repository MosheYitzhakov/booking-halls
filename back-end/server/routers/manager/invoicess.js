const express = require('express');
const { putInvoices } =require('../../../database/dbInvoices')
const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
    try {
        // const data = req.body
        // const user = await putInvoices(1, data)

        // res.send(user)
        res.send("user")
        // let postId = req.params.id_post;
        // if (!user.length) {
        //     res.status(401).json('No found posts')
        // } else {
        //     res.send(user)
        // }
    } catch (error) {
        res.send(error.message)
    }
})
.put('/:id_invoices', async (req, res) => {
    try {
        let id_invoices = req.params.id_invoices;
        const data = req.body
        console.log(Object.keys(data).length);
        if(!Object.keys(data).length){ res.send("length 0") }
else{

    res.send("not body to put")
}
        // const user = await putInvoices(id_invoices, data)
        
        // if(!user){
        // res.send(user)
        // res.send(user)
    } catch (error) {
        res.send(error.message)
    }
})