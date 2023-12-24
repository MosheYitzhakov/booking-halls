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
const { postEvents, getEvents } = require('../../database/dbEventsSchedule')
const { postInvoices } = require('../../database/dbInvoices');
const { pool } = require('../../database/dbConnection');
const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
    try {
        const halls = await getHalls()
        for (let i = 0; i < halls.length; i++) {
            halls[i].images = [];

        }
        const image = await getImages()
        halls.map(v => {
            for (let i = 0; i < image.length; i++) {
                if(v.id_hall < image[i].id_hall) return;
                if(v.id_hall === image[i].id_hall){
                    v.images.push(image[i])
                }
            }
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
    .get('/dates/', async (req, res) => {
        try {
            // const date = req.params.date;
            const dates = await getEvents()
            if (!dates.length) throw new Error(`dates not found`)

            res.send(dates)
        } catch (error) {
            res.send(error.message)
        }
    })
    .get('/dates/:date', async (req, res) => {
        try {
            const date = req.params.date;
            const dates = await getEvents(date)
            if (!dates.length) throw new Error(`dates not found`)

            res.send(dates)
        } catch (error) {
            res.send(error.message)
        }
    })
    .get('/hallsForDate/:date', async (req, res) => {
        try {
            const date = req.params.date;
            const halls = await getHallsForDate(date)
            if (!halls.length) res.status(401).json('No found hall')
            for (let i = 0; i < halls.length; i++) {
                halls[i].images = [];

            }
            const image = await getImages()
            halls.map(v => {
                for (let i = 0; i < image.length; i++) {
                    if(v.id_hall < image[i].id_hall) return;
                    if(v.id_hall ===image[i].id_hall){
                        v.images.push(image[i])
                    }
                }
            })
            res.send(halls)
        } catch (error) {
            res.send(error.message)
        }
    })
    .post('/craetOrder/', async (req, res) => {
        let conn = null;
        try {
            // const id_hall = req.params.id_hall;
            const allData = req.body.dataOrder
            // allData =  {
            //    "id_hall":"1"
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
            conn = await pool.getConnection();
            await conn.query("START TRANSACTION");

            const clientCId = await postClients(allData.nameC, Number(allData.phoneC), allData.emailC, "c",conn)
            // if (typeof clientCId !== 'number') return res.send("client c can't updated")


            const clientKId = await postClients(allData.nameK, Number(allData.phoneK), allData.emailK, "k",conn)
            // if (typeof clientKId !== 'number') {
                // await deleteUsers(clientCId)
                // return res.send("client k can't updated")
            // }
            const orderId = await postOrders(allData.id_hall, allData.num_guestsO, allData.num_m_adultsO, allData.num_m_childrenO, allData.num_m_barO, allData.typeO, allData.total_paymentO, allData.hebrew_dateD, allData.dateD, conn)

            const pCO = await postCO(clientCId, clientKId, orderId)
            const pE = await postEvents(allData.id_hall, allData.hebrew_dateD, allData.dateD)
            const pI = await postInvoices(allData.submits === 'k' ? clientKId : clientCId, allData.paymentI, new Date().toLocaleString("he-IL"), formatJewishDateInHebrew(toJewishDate(new Date())))
        //    console.log("orderId "+ orderId);
        //    console.log("pCO "+ pCO);
           
           await conn.query("COMMIT");

            res.send("orders is updated")
            // if (typeof user === 'string') {
            //     res.json('cannot posts')
            // } else {
            //     res.send(user)
            // }
        }  catch (error) {
            if (conn) await conn.query("ROLLBACK");
            throw error;
          } finally {
            if (conn) conn.release();
          }
    })  
   