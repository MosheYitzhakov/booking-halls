const express = require('express');
const { getManager } =require('../../../database/dbUsers')
const { localStorage } = require("node-localstorage");
const jwt = require("jsonwebtoken")
const router = express.Router();
module.exports = router;


router.post('/', async (req, res) => {
    try {
        const name = req.body.name
        const password = req.body.password
        const dataManager = await getManager(name, password)
        if (!dataManager.length) {
            res.json('No found user')
        } else {
            console.log(password);
            const user = { name: name }

            const token = jwt.sign(user, process.env.TOKEN, { expiresIn: '30m' })

            res.send({user, token})
        }
    } catch (error) {
        res.send(error.message)
    }
})