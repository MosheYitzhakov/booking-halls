const express = require("express");
const { getHalls, getHallsForDate } = require("../../../database/dbHalls");
const { getImages } = require("../../../database/dbImages");
const { postOrders } = require("../../../database/dbOrders");
const { getEvents } = require("../../../database/dbEventsSchedule");
const router = express.Router();
module.exports = router;

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

router.get("/dates/", async (req, res) => {
  try {
    const dates = await getEvents();
    if (!dates.length) throw new Error(`Dates not found`);
    res.send(dates);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/dates/:idHall", async (req, res) => {
  try {
    const { idHall } = req.params;

    const dates = await getEvents(idHall);
    if (!dates.length) throw new Error(`Dates not found`);
    res.send(dates);
  } catch (error) {
    res.send(error.message);
  }
});

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

router.post("/craeteOrder/", async (req, res) => {
  try {
    const allData = req.body;
    const orderId = await postOrders(allData);
    res.send({ orderId: orderId });
  } catch (error) {
    res.send(error.message);
  }
});
