// const { getUsers } = require('../database/dbUsers')
const jwt = require("jsonwebtoken")
async function authenticationToken(req, res, next) {
    try {
        const token = req.headers['auth']
        if (token === null){ return res.send('on authHeader')}

        jwt.verify(token, process.env.Secret, (err, user) => {
            if (err) return res.send('on token')
            req.user = user
            next()
        })
    } catch (error) {
    
        res.send("Incorrect authentication");
    }
}

module.exports = {authenticationToken }