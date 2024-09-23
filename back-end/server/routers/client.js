const express = require("express");
const { getHalls, getHallsForDate } = require("../../database/dbHalls");
const { getImages } = require("../../database/dbImages");
const { postOrders } = require("../../database/dbOrders");
const { getEvents } = require("../../database/dbEventsSchedule");
const router = express.Router();
module.exports = router;


/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Retrieve a list of halls
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: A list of halls
 *       404:
 *         description: Halls not found
 */
router.get("/", async (req, res) => {
  try {
    const halls = await getHalls();
    if (!halls.length) throw new Error(`Halls not found`);
    for (let i = 0; i < halls.length; i++) {
      halls[i].images = [];
    }
    const image = await getImages();
    halls.map((v) => {
      for (let i = 0; i < image.length; i++) {
        if (v.id_hall < image[i].id_hall) return;
        if (v.id_hall === image[i].id_hall) {
          v.images.push(image[i]);
        }
      }
    });
    if (!halls.length || !image.length) {
      res.send("No found hall");
    } else {
      res.send(halls);
    }
  } catch (error) {
    res.send(error.message);
  }
});

/**
 * @swagger
 * /api/halls/{name}:
 *   get:
 *     summary: Retrieve a specific hall by name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The name of the hall
 *         schema:
 *           type: string
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: Details of the hall
 *       404:
 *         description: Hall not found
 */
router.get("/halls/:name", async (req, res) => {
  try {
    const hall_name = req.params.name;
    const halls = await getHalls(hall_name);
    if (!halls.length) throw new Error(`Hall ${hall_name} not found`);
    const image = await getImages(halls[0].id_hall);
    halls[0].images = image;
    res.send(halls);
  } catch (error) {
    res.send(error.message);
  }
});

/**
 * @swagger
 * /api/dates:
 *   get:
 *     summary: Retrieve a list of event dates
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: A list of dates
 *       404:
 *         description: Dates not found
 */
router.get("/dates/", async (req, res) => {
  try {
    const dates = await getEvents();
    if (!dates.length) throw new Error(`Dates not found`);
    res.send(dates);
  } catch (error) {
    res.send(error.message);
  }
});

/**
 * @swagger
 * /api/dates/{date}:
 *   get:
 *     summary: Retrieve events for a specific date
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         description: The date to check for events
 *         schema:
 *           type: string
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: A list of events for the date
 *       404:
 *         description: Dates not found
 */
router.get("/dates/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const dates = await getEvents(date);
    if (!dates.length) throw new Error(`Dates not found`);
    res.send(dates);
  } catch (error) {
    res.send(error.message);
  }
});

/**
 * @swagger
 * /api/hallsForDate/{date}:
 *   get:
 *     summary: Retrieve halls available for a specific date
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         description: The hebrew date to check for available halls
 *         schema:
 *           type: string
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: A list of halls available for the date
 *       404:
 *         description: Halls not found
 */
router.get("/hallsForDate/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const halls = await getHallsForDate(date);
    if (!halls.length) res.send("No found hall");
    for (let i = 0; i < halls.length; i++) {
      halls[i].images = [];
    }
    const image = await getImages();
    halls.map((v) => {
      for (let i = 0; i < image.length; i++) {
        if (v.id_hall < image[i].id_hall) return;
        if (v.id_hall === image[i].id_hall) {
          v.images.push(image[i]);
        }
      }
    });
    console.log(halls);
    res.send(halls);
  } catch (error) {
    res.send(error.message);
  }
});

/**
 * @swagger
 * /api/craetOrder:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // הוסף כאן את המאפיינים של ההזמנה
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */
router.post("/craetOrder/", async (req, res) => {
  try {
    const allData = req.body;
    const orderId = await postOrders(allData);
    res.send({ orderId: orderId });
  } catch (error) {
    res.send(error.message);
  }
});
