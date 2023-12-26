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
        try {
            const allData = req.body
            const orderId = await postOrders(allData)

            res.send(orderId)
        } catch (error) {
            return  error.message
        }








      
    })  


   