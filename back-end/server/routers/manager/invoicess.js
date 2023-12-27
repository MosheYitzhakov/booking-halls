const express = require('express');
const { postInvoices, getInvoices } = require('../../../database/dbInvoices');
const { formatJewishDateInHebrew, toJewishDate } = require('jewish-date');
const router = express.Router();
module.exports = router;

router.get('/:nameM', async (req, res) => {
    try {
        let nameM = req.params.nameM;
        const user = await getInvoices(nameM)
        if (!user.length) {
            res.status(401).json('No found invoices')
        } else {
            res.send(user)
        }
    } catch (error) {
        res.send(error.message)
    }
})
    .post('/', async (req, res) => {
        try {

            const id_user = req.body.id_user
            const payment = req.body.payment

            const pI = await postInvoices(id_user, payment, new Date().toLocaleString("he-IL"), formatJewishDateInHebrew(toJewishDate(new Date())))
            if (typeof pI === "number") {
                res.send(`posted invoices number ${pI}`)
            } else {
                res.send(pI)
            }

        } catch (error) {
            res.send(error.message)
        }
    })