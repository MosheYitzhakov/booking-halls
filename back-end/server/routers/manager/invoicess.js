const express = require('express');
const { postInvoices, getInvoices } = require('../../../database/dbInvoices');
const { authenticationToken } = require('../../authenticationToken');
const { formatJewishDateInHebrew, toJewishDate } = require('jewish-date');
const router = express.Router();
module.exports = router;
router.use(authenticationToken)
router.get('/:nameM', async (req, res) => {
    try {
        let nameM = req.params.nameM;
        if (nameM !== req.user.name) {
            res.send('No found Correct authentication ')
        } else {
        const user = await getInvoices(nameM)
        if (!user.length) {
            res.json('No found invoices')
        } else {
            res.send(user)
        }
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