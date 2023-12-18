const express = require('express');
const {
    toJewishDate,
    formatJewishDateInHebrew,
} = require("jewish-date");
const { getHalls, getHallsForDate } = require('../../database/dbHalls')
const { getImages } = require('../../database/dbImages')
const { postClients, deleteUsers } = require('../../database/dbUsers')
const { postOrders } = require('../../database/dbOrders')
const { postCO } = require('../../database/dbCustomers_Orders')
const { postEvents } = require('../../database/dbEventsSchedule')
const { postInvoices } = require('../../database/dbInvoices')
const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
    try {
        const halls = await getHalls()
        for (let i = 0; i < halls.length; i++) {
            halls[i].images = [];

        }
        const image = await getImages()
        image.map(v => {
            halls[v.id_hall - 1] = { ...halls[v.id_hall - 1], images: [...halls[v.id_hall - 1].images, v] }
        })
        if (!halls.length || !image.length) {
            res.status(401).json('No found hall')
        } else {
            res.send(halls)
        }

    } catch (error) {
        res.send(error.message)
    }
})
    .get('/halls/:name', async (req, res) => {
        try {
            const hall_name = req.params.name;
            const halls = await getHalls(hall_name)
            if (!halls.length) throw new Error(`Hall ${hall_name} not found`)
            const image = await getImages(halls[0].id_hall)
            halls[0].images = image

            res.send(halls)
        } catch (error) {
            res.send(error.message)
        }
    })
    .get('/date/:date', async (req, res) => {
        try {
            const date = req.params.date;
            console.log(date);
            const halls = await getHallsForDate(date)
            const image = await getImages()
            console.log(image);
            image.map(v => {
                console.log(v);
                halls[v.id_hall - 1] = { ...halls[v.id_hall - 1], images: [...images, v] }
            })
            if (!halls.length) {
                res.status(401).json('No found hall')
            } else {
                res.send(halls)
            }
        } catch (error) {
            res.send(error.message)
        }
    })
    .post('/craetOrder/:id_hall', async (req, res) => {
        try {
            const id_hall = req.params.id_hall;
            const allData = req.body
            // allData =  {
            //     "nameC": "name c",
            //     "phoneC": "05033332 c",
            //     "emailC": "avi@com c",
            //     "nameK": "name k",
            //     "phoneK": "05033332 k",
            //     "emailK": "avi@com k",
            //     "submits": "k",
            //     "num_guestsO": 500,
            //     "num_m_adultsO": 300,
            //     "num_m_childrenO": 200,
            //     "num_m_barO": 1000,
            //     "typeO": "p",
            //     "total_paymentO": 12000,
            //     "dateD": "2020-12-10",
            //     "hebrew_dateD": " יח חשוון תשעט ",
            //     "paymentI": 1500
            // }

            // if(!body){
            //     throw new Error("Body is required")
            // }


            const clientCId = await postClients(allData.nameC, Number(allData.phoneC), allData.emailC, "c")
            if (typeof clientCId !== 'number') return res.send("client c can't updated")
            const clientKId = await postClients(allData.nameK, Number(allData.phoneK), allData.emailK, "k")
            if (typeof clientKId !== 'number') {
                await deleteUsers(clientCId)
                return res.send("client k can't updated")
            }
            const orderId = await postOrders(id_hall, allData.num_guestsO, allData.num_m_adultsO, allData.num_m_childrenO, allData.num_m_barO, allData.typeO, allData.total_paymentO,allData.hebrew_dateD,allData.dateD )

            const pCO = await postCO(clientCId, clientKId, orderId)
            const pE = await postEvents(id_hall, allData.hebrew_dateD, allData.dateD)
            const pI = await postInvoices(allData.submits === 'k' ? clientKId : clientCId, allData.paymentI, new Date().toLocaleString("he-IL"), formatJewishDateInHebrew(toJewishDate(new Date())))

            res.send("orders is updated")
            // if (typeof user === 'string') {
            //     res.json('cannot posts')
            // } else {
            //     res.send(user)
            // }
        } catch (error) {
            res.send(error.message)
        }
    })  